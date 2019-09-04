import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestore, functions } from '../../../Utils/Firebase';
import Spinner from '../../../Shared/Spinner';
import BadgrContext from '../../../Shared/BadgrContext';

/**
 * Converts an image to a BASE64 string
 * @param {String} url url to the image
 * @param {Function} callback callback function wich has the BASE64 representation of the image as argument
 */
function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

/**
 * Root component of the validate opportunity page
 * Also renders a list of the validated opportunities
 */
class ValidateOpportunity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issuers: null,
            opportunities: null,
            beacons: null
        };

        this.getOpportunities = this.getOpportunities.bind(this);
        this.getIssuers = this.getIssuers.bind(this);
    }

    componentDidMount() {
        this.getIssuers();
        this.getOpportunities();
        window.scrollTo(0, 0);
    }

    /**
     * Fetch the issuers from Firebase
     */
    getIssuers() {
        firestore.onceGetValidatedIssuers().then(snapshot => {
            let res = {};
            snapshot.forEach(doc => {
                res[doc.id] = doc.data();
            });
            this.setState(() => ({ issuers: res }));
        })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    /**
     * Fetch validated opportunities from Firebase
     */
    getOpportunities() {
        firestore.onceGetNonValidatedOpportunities().then(snapshot => {
            let res = {};
            snapshot.forEach(doc => {
                res[doc.id] = doc.data();
            });
            this.setState(() => ({ opportunities: res }));
        })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    render() {
        const { opportunities, issuers } = this.state;

        return (
            <BadgrContext.Consumer>
                {badgrAuth => badgrAuth !== undefined
                    ? <React.Fragment>
                        {!!opportunities && 
                            <OpportunitiesList
                                opportunities={opportunities}
                                issuers={issuers}
                                getOpportunities={this.getOpportunities}
                                badgrAuth={badgrAuth}
                            />
                        }
                        {!!opportunities && Object.getOwnPropertyNames(opportunities).length === 0 && <EmptyList />}
                        {!opportunities && <Loading />}
                    </React.Fragment>
                    : <Loading />
                }
            </BadgrContext.Consumer>
        );
    }
}

/**
 * List of all opportunities in the validate opportunity page
 * Also renders individual Opportunity components
 */
class OpportunitiesList extends Component {

    render() {
        const { opportunities, getOpportunities, badgrAuth, issuers } = this.props;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="content">
                        <Link to="/" className="back">&lt; Terug</Link>
                        <h1>Valideer leerkans</h1>
                        <div className="card-container opportunities">
                            {Object.keys(opportunities).map(key =>
                                <Opportunity
                                    opportunity={opportunities[key]}
                                    issuer={issuers[opportunities[key].issuerId]}
                                    key={key}
                                    id={key}
                                    getOpportunities={getOpportunities}
                                    badgrAuth={badgrAuth}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


/**
 * Component which renders an opportunity which can be validated.
 * This component handles submission, change, creation of badge classes, firebase validation of opportunity
 */
class Opportunity extends Component {
    constructor(props) {
        super(props);

        this.state = { badge: null, validating: false, issuer: null };

        this.onSubmit = this.onSubmit.bind(this);
        this.postNewBadge = this.postNewBadge.bind(this);
        this.validateOpportunity = this.validateOpportunity.bind(this);
    };

    componentDidUpdate(prevState) {
        // If statement results true after onSubmit call
        if (this.state.badge !== null && this.state.badge.badgrId !== undefined && prevState.badge !== this.state.badge) {
            // console.log("badgr badge created: ", this.state.badge);
            this.validateOpportunity();
        }
    }

    /**
     * Handles the submission of the button
     * This function will create the badge class
     * @param {Event} event 
     */
    onSubmit(event) {
        event.preventDefault();
        this.setState({validating: true});
        this.createBadge();
    }

    /**
     * Validates the opportunity
     */
    validateOpportunity() {
        let opportunityId = this.props.id;
        console.log("validating opportunity");
        firestore.validateOpportunity(opportunityId).catch(function (error) {
            console.error("Error validating opportunity: ", error);
        });
        this.postNewBadge(opportunityId);
        this.props.getOpportunities();
    }

    /**
     * Creates a badgeclass on badgr.
     * This function tries this 3 times, if it fails, it throws a custom error
     * @param {number} tries amount of times we tried this function
     */
    createBadge(tries = 0) {

        // Creation of badgeclass is not possible somehow, throw error
        if (tries >= 3) {
            let error = {
                name: "Failed to refresh access token",
                message: "An internal error occurred, contact a system admin",
                function: this.createBadge,
                status: 500
            }
            throw error;
        }

        let opportunity = this.props.opportunity;
        let name;
        let badge = {};
        let baseUrl = "https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Badges%2F";
        let image = baseUrl;

        // Create URL to the correct image
        switch (parseInt(opportunity.category, 10)) {
            case 0: name = "Digitale Geletterdheid"; image += "badge_digital-literacy"; break;
            case 1: name = "Duurzaamheid"; image += "badge_sustainability"; break;
            case 2: name = "Ondernemingszin"; image += "badge_entre-spirit"; break;
            case 3: name = "Onderzoekende houding"; image += "badge_research"; break;
            case 4: name = "Wereldburgerschap"; image += "badge_global-citizenship"; break;
            default: break;
        }
        switch (parseInt(opportunity.difficulty, 10)) {
            case 0: image += "_1.png?alt=media"; break;
            case 1: image += "_2.png?alt=media"; console.log("Entered!!"); break;
            case 2: image += "_3.png?alt=media"; break;
            default: break;
        }

        // Fill in badgeclass object
        badge["type"] = "BadgeClass";
        badge["name"] = opportunity.title;
        badge["description"] = opportunity.longDescription;
        badge["image"] = image;
        badge["criteria"] = opportunity.shortDescription + " - " + name;
        badge["issuerId"] = opportunity.issuerId;

        let self = this;

        // Convert image to BASE64 string
        toDataUrl(image, function (myBase64) {
            let data = {
                name: badge.name,
                description: badge.description,
                issuer: self.props.issuer.badgrId,
                image: myBase64,
                criteriaNarrative: badge.criteria
            }

            // Call cloudfunction to create a badgeclass on badgr
            functions.createBadgrBadgeClass({
                badgeData: data,
                issuerID: data.issuer
            }
            ).then(res => {
                // Fill in badgrId, useful later on
                badge["badgrId"] = res.data.createdBadgeClass.entityId;
                // Update state to trigger componentDidUpdate
                self.setState({ badge: badge });
            }
            )
                .catch(err => {
                    if (err.message.indexOf('Access token expired') !== -1 || err.status === 'PERMISSION_DENIED') {
                        // permission-denied is thrown when an expired access token is used
                        console.log("Access token expired, refreshing... (tried: [" + (tries + 1).toString() + "] time(s))");
                        functions.refreshAccessToken()
                            .then(() => {
                                // also a cloud function
                                self.createBadge(tries++);
                            })
                            .catch(err => {
                                throw err;
                            });
                    } else {
                        console.error("Error occurred while trying to validate opportunity", err);
                    }
                });
        });
    }

    /**
     * Add new badgeclass to firebase
     * @param {Number} opportunityId 
     */
    postNewBadge(opportunityId) {
        firestore.createNewBadge(this.state.badge).then(function (docRef) {
            firestore.linkBadgeToOpportunity(opportunityId, docRef.id);
        })
        .then(() => this.setState({validating: false}))
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }

    render() {
        const { opportunity } = this.props;
        const { validating } = this.state;


        return (
            <div className={`card-item opportunity ${opportunity.category}`} key={opportunity.addressId}>
                <div className="opportunity--info">
                    <h2 className="title-opportunity-info">{opportunity.title}</h2>
                    <div className="meta-data">
                        <small>{opportunity.beginDate + ' - ' + opportunity.endDate}</small>
                    </div>
                    <p className="text-opportunity-description">{opportunity.shortDescription}</p>
                    <button className="button-opportunity-accept" onClick={this.onSubmit} disabled={validating}>Accepteren</button>
                </div>
            </div>
        )
    }
}

const EmptyList = () =>
    <div>
        <div className="container">
            <div className="content">
                Er zijn geen te valideren leerkansen.
            </div>
        </div>
    </div>

const Loading = () =>
    <div>
        <Spinner />
    </div>

// Opportunity = reduxForm({
//     form: 'opportunity',
//     validate,
//     fields: ['beaconId']
// })(Opportunity);

export default ValidateOpportunity;
