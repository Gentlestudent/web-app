import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../../../Utils/Firebase';
import Spinner from '../../../Shared/Spinner';
import { Field, reduxForm } from 'redux-form';
import BadgrContext from '../../../Shared/BadgrContext';
import { renderSelect, validate } from '../../../Shared/Utils';
import { functions } from '../../../Utils/Firebase'

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


class ValidateOpportunity extends Component {
    constructor() {
        super();
        // this.submit = this.submit.bind(this);
        this.state = {
            issuers: null,
            opportunities: null,
            beacons: null
        };
        this.getOpportunities = this.getOpportunities.bind(this);
    };
    componentDidMount() {
        this.getIssuers();
        this.getOpportunities();
        this.getBeacons();
        window.scrollTo(0, 0);
    }
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
    getBeacons() {
        firestore.onceGetBeacons().then(snapshot => {
            let res = {};
            snapshot.forEach(doc => {
                // console.log("id:"+doc.data().beaconId);
                if (doc.data().major !== undefined && doc.data().minor !== undefined && doc.data().name !== undefined) {
                    res[doc.id] = doc.data();
                }
            });
            res["MakeNewTrue"] = { name: "> Maak een nieuwe beacon" };
            this.setState(() => ({ beacons: res }));
        })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }
    render() {
        const { opportunities, beacons, issuers } = this.state;

        return (
            <BadgrContext.Consumer>
                {badgrAuth => badgrAuth !== undefined
                    ? <React.Fragment>
                        {!!opportunities && !!beacons &&
                            <OpportunitiesList
                                opportunities={opportunities}
                                issuers={issuers}
                                getOpportunities={this.getOpportunities}
                                beacons={beacons}
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

class OpportunitiesList extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        // this.handleClick = this.handleClick.bind(this);
        // this.postNewBadge = this.postNewBadge.bind(this);
    };

    //   handleClick(event) {
    //     event.preventDefault();
    //     console.log(event.target.id);
    //     firestore.validateOpportunity(event.target.id);
    //     this.postNewBadge(event.target.id);
    //     this.props.getOpportunities();
    //   }

    //   postNewBadge(opportunityId){
    //     let opportunity = this.props.opportunities[opportunityId];
    //     let badge = new Object();
    //     let name = "";
    //     let baseUrl = "https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Badges%2F";
    //     let image = baseUrl;
    //     switch(opportunity.category){
    //         case 0: {name = "Digitale Geletterdheid"; image += "badge_digitale-geletterdheid";}
    //         case 1: {name = "Duurzaamheid"; image += "badge_duurzaamheid";}
    //         case 2: {name = "Ondernemingszin"; image += "badge_ondernemingszin";}
    //         case 3: {name = "Onderzoekende houding"; image += "badge_onderzoekende-houding";}
    //         case 4: {name = "Wereldburgerschap"; image += "badge_wereldburgerschap";}
    //     }
    //     switch(opportunity.difficulty){
    //         case 0: image+= "_1.png?alt=media";
    //         case 1: image+= "_2.png?alt=media";
    //         case 2: image+= "_3.png?alt=media";
    //     }
    //     badge["type"]= "BadgeClass";
    //     badge["name"]= name;
    //     badge["description"]= opportunity.description;
    //     badge["image"]= image;
    //     badge["criteria"]= opportunity.shortDescription;
    //     badge["issuerId"]= opportunity.issuerId;
    //     firestore.createNewBadge(badge).then(function(docRef) {
    //         console.log("Document written with ID: ", docRef.id);
    //         firestore.linkBadgeToOpportunity(opportunityId, docRef.id);
    //       }).catch(function(error) {
    //         console.error("Error adding document: ", error);
    //       });
    // }

    render() {
        const { opportunities, beacons, getOpportunities, badgrAuth, issuers } = this.props;

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
                                    beacons={beacons}
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

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class Opportunity extends Component {
    constructor(props) {
        super(props);

        this.state = { badge: null, beaconId: "", makeNew: false, issuer: null };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.postNewBadge = this.postNewBadge.bind(this);
        this.validateOpportunity = this.validateOpportunity.bind(this);
        this.postNewBeacon = this.postNewBeacon.bind(this);
    };

    componentDidUpdate(prevState) {
        if (this.state.badge !== null && this.state.badge.badgrId !== undefined && prevState.badge !== this.state.badge) {
            console.log("badgr badge created: ", this.state.badge);
            this.validateOpportunity();
        }
    }

    handleChange(event) {
        // console.log(event.target.value);
        this.setState({ [event.target.id]: event.target.value });
        if (event.target.value === "MakeNewTrue") {
            this.setState({ makeNew: true });
        }
        else {
            this.setState({ makeNew: false });
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.createBadge();
    }

    validateOpportunity() {
        let beaconId = this.state.beaconId;
        let opportunityId = this.props.id;
        console.log("validating opportunity");
        firestore.validateOpportunity(opportunityId).catch(function (error) {
            console.error("Error validating opportunity: ", error);
        });
        console.log("linking beacon to opportunity", beaconId);
        firestore.linkBeaconToOpportunity(opportunityId, beaconId).catch(function (error) {
            console.error("Error linking beacon: ", error);
        });
        console.log("linking opportunity to beacon");
        firestore.linkOpportunityToBeacon(beaconId, opportunityId).catch(function (error) {
            console.error("Error linking opportunity: ", error);
        });
        this.postNewBadge(opportunityId);
        this.props.getOpportunities();
    }

    createBadge() {
        let opportunity = this.props.opportunity;
        let name;
        let badge = {};
        let baseUrl = "https://firebasestorage.googleapis.com/v0/b/gentle-student.appspot.com/o/Badges%2F";
        let image = baseUrl;
        console.log(opportunity.category);
        console.log(opportunity.difficulty);
        switch (parseInt(opportunity.category, 10)) {
            case 0: name = "Digitale Geletterdheid"; image += "badge_digital-literacy"; break;
            case 1: name = "Duurzaamheid"; image += "badge_sustainability"; break;
            case 2: name = "Ondernemingszin"; image += "badge_entre-spirit"; break;
            case 3: name = "Onderzoekende houding"; image += "badge_research"; break;
            case 4: name = "Wereldburgerschap"; image += "badge_global-citizenship"; break;
            default: break;
        }
        switch (parseInt(opportunity.difficulty,10)) {
            case 0: image += "_1.png?alt=media"; break;
            case 1: image += "_2.png?alt=media"; console.log("Entered!!"); break;
            case 2: image += "_3.png?alt=media"; break;
            default: break;
        }

        console.log("Image", opportunity.difficulty);

        badge["type"] = "BadgeClass";
        badge["name"] = opportunity.title;
        badge["description"] = opportunity.longDescription;
        badge["image"] = image;
        badge["criteria"] = opportunity.shortDescription + " - " + name;
        badge["issuerId"] = opportunity.issuerId;


        console.log("Firebase Image: ", image);

        let self = this;
        let accessToken = this.props.badgrAuth.accessToken;
        let header = { headers: { Authorization: "Bearer " + accessToken } };
        // TODO fill in fields
        toDataUrl(image, function (myBase64) {
            let data = {
                name: badge.name,
                description: badge.description,
                issuer: self.props.issuer.badgrId,
                image: myBase64,
                criteriaNarrative: badge.criteria
            }

            // console.log("BADGR DATA", data);

            console.log("Entering createBadgeClass function");
            functions.createBadgrBadgeClass({
                badgeData: data,
                issuerID: data.issuer
            }
            ).then(res => {
                console.log("Oi successs!!!", res);
                badge["badgrId"] = res.data.createdBadgeClass.entityId;
                self.setState({badge: badge});
            }
            )
            .catch(err => console.error("Boooo error", err));

            // axios.post("https://api.badgr.io/v2/badgeclasses", data, header)
            //     .then(res => {
            //         console.log("Created badgr badgeclass", res);
            //         // console.log(JSON.stringify(badge));
            //         badge["badgrId"] = res.data.result[0].entityId;
            //         self.setState({ badge: badge });
            //     })
            //     .catch(err => { console.error("ERROR"); console.error(err); console.log("data", data) });
        });
    }

    postNewBeacon(major, minor, name) {
        let addressId = this.props.opportunity.addressId;
        let beacon = {};
        beacon["major"] = major;
        beacon["minor"] = minor;
        beacon["range"] = 0;
        beacon["addressId"] = addressId;
        beacon["opportunities"] = {};
        beacon["name"] = name;
        let self = this;
        console.log("posting beacon to firebase: ", beacon);
        firestore.createNewBeacon(beacon).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            self.validateOpportunity(docRef.id);
        }).catch(function (error) {
            console.log("Error adding document: ", error);
        });
    }

    postNewBadge(opportunityId) {
        console.log("posting badge to firebase: ", this.state.badge);
        firestore.createNewBadge(this.state.badge).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            firestore.linkBadgeToOpportunity(opportunityId, docRef.id);
        }).catch(function (error) {
            console.log("Error adding document: ", error);
        });
    }

    render() {
        const { opportunity, beacons } = this.props;
        const { beaconId, makeNew, error } = this.state;
        const isInvalid =
            beaconId === ""
            ;

        return (
            <div className={`card-item opportunity ${opportunity.category}`} key={opportunity.addressId}>
                {/* <img src={opportunity.oppImageUrl ? `${opportunity.pinImageUrl}` : null} className="photo" alt={opportunity.title} /> */}
                <div className="opportunity--info">
                    {/* <img src={opportunity.oppImageUrl ? `${opportunity.oppImageUrl}` : null} className="badge" /> */}
                    <h2 className="title-opportunity-info">{opportunity.title}</h2>
                    <div className="meta-data">
                        <small>{opportunity.beginDate + ' - ' + opportunity.endDate}</small>
                        {/* <small>{opportunity.street + ' ' + opportunity.house_number + ', ' + opportunity.postal_code + ' ' + opportunity.city}</small> */}
                    </div>
                    <p className="text--opportunity-description">{opportunity.shortDescription}</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <Field
                                id="beaconId"
                                name="beaconId"
                                label="Kies een beacon: "
                                data={{
                                    list: Object.keys(beacons).map(key => {
                                        return {
                                            value: key,
                                            display: beacons[key].name
                                        };
                                    })
                                }}
                                component={renderSelect}
                                onChange={this.handleChange}
                            />
                            {!makeNew && <small>(Of maak een nieuwe beacon door de optie "> Maak een nieuwe beacon" te selecteren)</small>}
                        </div>
                        {!makeNew && <button className="button--opportunity-accept" disabled={isInvalid} type="submit">
                            Accepteren
                        </button>}

                        {error && <p>{error.message}</p>}
                    </form>
                    {!!makeNew && <AddBeacon postNewBeacon={this.postNewBeacon} />}
                </div>
            </div>
        )
    }
}

class AddBeacon extends Component {
    constructor(props) {
        super(props);

        this.state = { major: "", minor: "", name: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.postNewBeacon = this.postNewBeacon.bind(this);
    }

    handleChange(event) {
        // console.log(event.target.value);
        this.setState({ [event.target.id]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.postNewBeacon(this.state.major, this.state.minor, this.state.name);
    }

    render() {
        const { major, minor, name, error } = this.state;
        const isInvalid =
            major === "" ||
            minor === "" ||
            name === ""
            ;

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        Major:
                        <input
                            value={major}
                            onChange={event => this.setState(byPropKey('major', event.target.value))}
                            type="text"
                            placeholder="Major"
                        />
                    </div>
                    <div className="form-group">
                        Minor:
                        <input
                            value={minor}
                            onChange={event => this.setState(byPropKey('minor', event.target.value))}
                            type="text"
                            placeholder="Minor"
                        />
                    </div>
                    <div className="form-group">
                        Beacon naam:
                        <input
                            value={name}
                            onChange={event => this.setState(byPropKey('name', event.target.value))}
                            type="text"
                            placeholder="Beacon naam"
                        />
                    </div>
                    <button disabled={isInvalid} type="submit">
                        Voeg toe
                    </button>

                    {error && <p>{error.message}</p>}
                </form>
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

Opportunity = reduxForm({
    form: 'opportunity',
    validate,
    fields: ['beaconId']
})(Opportunity);

export default ValidateOpportunity;
