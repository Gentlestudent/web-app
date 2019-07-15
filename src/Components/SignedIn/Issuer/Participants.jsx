import React, { Component } from 'react';

import Spinner from '../../../Shared/Spinner';

import { firestore, functions } from '../../../Utils/Firebase';
import BadgrContext from '../../../Shared/BadgrContext';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            participants: null,
            isEmpty: false,
            id: props.id
        }

        this.loadParticipants = this.loadParticipants.bind(this);

    }
    componentDidMount() {
        this.loadParticipants();
        this.setState({ isEmpty: true });
    }
    loadParticipants() {
        let res = {};
        let self = this;
        console.log("fetching participations for opportunity with id ", self.state.id);
        firestore.onceGetParticipationsForOpportunity(this.props.id).then((participations) => {
            participations.forEach(function (participation) {
                let id = participation.data().participantId;
                let status = participation.data().status;
                let participationId = participation.id;
                // console.log("participation id", id);
                // if(status!=2){
                firestore.onceGetParticipant(id).then(participant => {
                    // console.log("Firestore participant:", participant.data());
                    res[participant.id] = participant.data();
                    res[participant.id]["id"] = participant.id;
                    res[participant.id]["participationStatus"] = status;
                    res[participant.id]["participationId"] = participationId;
                    self.setState(() => ({ participants: res }))
                })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });
                // }
            })
            console.log(this.state.participants);
        })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    render() {
        const { participants, isEmpty } = this.state;

        return (
            <BadgrContext.Consumer>
                {badgrAuth => badgrAuth !== undefined
                    ? <React.Fragment>
                        {!!participants &&
                            <div className="content">
                                <h3>Deelnemers:</h3>
                                <div className="participants">
                                    <table>
                                        <tr className='participant'>
                                            <th>Deelnemer</th>
                                            <th>Institutie</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Acties</th>
                                        </tr>
                                        {Object.keys(participants).map(key =>
                                            <Participant
                                                participant={participants[key]}
                                                opportunity={this.props.opportunity}
                                                loadParticipants={this.loadParticipants}
                                                badgrAuth={badgrAuth}
                                            />
                                        )}
                                    </table>
                                </div>
                            </div>
                        }
                        {!participants && !isEmpty && <LoadingList />}
                    </React.Fragment>
                    : <LoadingList />
                }
            </BadgrContext.Consumer>
        )
    }
}

class Participant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            badgrBadgeClassID: "",
            assertion: null
        }

        this.postBadgrBadge = this.postBadgrBadge.bind(this);
        this.giveBadge = this.giveBadge.bind(this);
        this.undo = this.undo.bind(this);
        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
    }

    componentDidUpdate(prevState) {

        // giveBadge() should make this if statement true
        if (this.state.badgrBadgeClassID !== ""
            && this.state.assertion !== null
            && prevState.badgrBadgeClassID !== this.state.badgrBadgeClassID
            && prevState.assertion !== this.state.assertion) {

            console.log("trying to post to badgr...");
            this.postBadgrBadge();
        }
    }

    postBadgrBadge(tries = 0) {

        if (tries >= 3) {
            let error = {
                name: "Failed to refresh access token",
                message: "An internal error occurred, contact a system admin",
                function: this.createBadge,
                status: 500
            }
            throw error;
        }

        // let accessToken = this.props.badgrAuth.accessToken;
        // let header = { headers: { Authorization: "Bearer " + accessToken } };

        let email = this.props.participant.email;
        // console.log("Participant email: ", email);

        let participationId = this.props.participant["participationId"];
        // console.log("Participation id", participationId);

        let badgrId = this.state.badgrBadgeClassID;
        // console.log("badgr id", badgrId);

        let data = {
            recipient: {
                type: "email",
                identity: email
            }
        }

        functions.createBadgrAssertion({
            badgeID: badgrId,
            assertionData: data
        })
            .then(res => {
                let assertion = this.state.assertion;
                assertion["badgrId"] = res.data.createdAssertion.entityId;
                firestore.createNewAssertion(assertion);
                firestore.completeParticipation(participationId)
                    .then(res => {
                        console.log("Completed participation", res);
                        this.setState({
                            assertion: null,
                            badgrBadgeClassID: ""
                        })
                        this.props.loadParticipants();
                    });
            })
            .catch(err => {
                switch (err.status) {
                    case 403:
                        // 403 is thrown when an expired access token is used
                        console.log("Access token expired, refreshing... (tried: [" + (tries + 1).toString() + "] time(s))");
                        functions.refreshAccessToken().then(() => {
                            this.postBadgrBadge(tries++);
                        })
                            .catch(err => {
                                throw err;
                            });
                        break;
                    default:
                        console.error("Error occurred while trying to validate opportunity", err);
                }
            });

        // Post to the badgr API
        // axios.post("https://api.badgr.io/v2/badgeclasses/" + badgrId + "/assertions", data, header).then(res => {

        //     console.log("Post to badgr api successfull, result", res);
        //     // Finalize giveBadge process
        //     firestore.createNewAssertion(this.state.assertion).catch(err => {
        //         console.log("failed creating assertion:" + err);
        //     });;
        //     var self = this;
        //     // Complete the participation
        //     firestore.completeParticipation(participationId)
        //         .then(res => {
        //             console.log("Completed participation", res);
        //             self.props.loadParticipants();
        //         })
        //         .catch(err => {
        //             console.log("failed completing participation:", err);
        //         });
        // }
        // ).catch(err => console.log(err));
    }

    giveBadge(event) {
        event.preventDefault();

        let participant = this.props.participant;
        console.log("Particpant ", participant);
        let badgeId = this.props.opportunity.badgeId;

        // Create today date
        let date = new Date();
        let month = "" + (date.getMonth() + 1);
        if (month.length === 1) {
            month = "0" + month;
        }
        let day = "" + (date.getDate());
        if (day.length === 1) {
            day = "0" + day;
        }
        let today = date.getFullYear() + "-" + month + "-" + day;
        console.log(today);

        // Create assertion
        let newAssertion = {};
        newAssertion["badge"] = badgeId;
        newAssertion["badgeId"] = badgeId;
        newAssertion["id"] = "";
        newAssertion["issuedOn"] = today;
        newAssertion["recipient"] = participant.name;
        newAssertion["recipientId"] = participant.id;
        newAssertion["type"] = "Assertion";
        newAssertion["verification"] = badgeId;
        console.log("Created assertion", newAssertion);

        // Fetch badge from the database
        firestore.onceGetBadge(badgeId).then(res => {
            // No badgr ID found? throw error, we need this
            let badge = res.data();
            if (badge.badgrId === undefined)
                throw Error("Badge didnt have a badgr ID");
            // Update state
            this.setState({ badgrBadgeClassID: badge.badgrId, assertion: newAssertion });
            console.log("Found badgr id", badge.badgrId);
        });
    }

    accept(event) {
        event.preventDefault();
        let self = this;
        firestore.acceptParticipation(event.target.id)
            .then(res => {
                self.props.loadParticipants();
            })
            .catch(err => {
                console.log("failed accepting participation:", err);
            });
        // self.loadParticipants();
    }
    reject(event) {
        event.preventDefault();
        let self = this;
        firestore.rejectParticipation(event.target.id)
            .then(res => {
                self.loadParticipants();
            })
            .catch(err => {
                console.log("failed rejecting participation:" + err);
            });
        // self.loadParticipants();
    }
    undo(event) {
        event.preventDefault();
        let self = this;
        firestore.undoParticipation(event.target.id)
            .then(res => {
                self.loadParticipants();
            })
            .catch(err => {
                console.log("failed rejecting participation:" + err);
            });
        // self.loadParticipants();
    }

    render() {

        const { participant } = this.props;

        console.log(participant);

        return (
            <tr className='participant'>
                <td>
                    <div className="table-el">{participant.name}</div>
                </td>
                <td>
                    <div className="table-el">{participant.institute}</div>
                </td>
                <td>
                    <div className="table-el">{participant.email}</div>
                </td>

                {participant.participationStatus === 0 && <td><div className="table-el">In afwachting</div></td>}
                {participant.participationStatus === 1 && <td><div className="table-el">Goedgekeurd</div></td>}
                {participant.participationStatus === 2 && <td><div className="table-el">Geweigerd</div></td>}
                {participant.participationStatus === 3 && <td><div className="table-el">Afgewerkt</div></td>}
                {participant.participationStatus === 0 &&
                    <td><div className="table-el">
                        <button onClick={this.accept} id={participant.participationId}>Accepteer</button>
                        <button onClick={this.reject} id={participant.participationId}>Weiger</button>
                    </div></td>
                }
                {participant.participationStatus === 1 && <td><div className="table-el"><button onClick={this.giveBadge}>Geef badge</button></div></td>}
                {participant.participationStatus === 2 && <td><div className="table-el"><button onClick={this.undo}>Maak ongedaan</button></div></td>}
            </tr>
        );
    }
}

const LoadingList = () =>
    <div>
        <Spinner />
    </div>

export default List;