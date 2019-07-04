import React, { Component } from 'react';

import Spinner from '../../../Shared/Spinner';

import { firestore } from '../../../Utils/Firebase';

class List extends Component {
	constructor(props){
        super(props);

        this.giveBadge = this.giveBadge.bind(this);
        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
        this.undo = this.undo.bind(this);

        this.state ={
            participants: null,
            isEmpty: false
        }
	}
	componentDidMount(){
        this.loadParticipants();
        this.setState({isEmpty: true});
	}
	loadParticipants(){
        var res = new Object();
		var self = this;
		console.log("fetching participations for opportunity with id "+this.props.id);
        firestore.onceGetParticipationsForOpportunity(this.props.id).then((participations) => {
			participations.forEach(function (participation){
                let id = participation.data().participantId;
                let status = participation.data().status;
                let participationId = participation.id;
                // console.log(id);
                // if(status!=2){
                    firestore.onceGetParticipant(id).then(participant => {
                        // console.log(participant.id);
                        // console.log(participant.data());
                        res[participant.id] = participant.data();
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
			<React.Fragment>
				{ !! participants && 
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
                                <Participant participant={participants[key]} />
							)}
							</table>
						</div>
					</div>
				}
				{ ! participants && !isEmpty && <LoadingList/> }
			</React.Fragment>
		)
	}
}

class Participant extends Component {
    constructor(props){
        super(props);

        this.state = {

        }
    }

    giveBadge(event) {
        event.preventDefault();
        let participantId = event.target.id;
        console.log(participantId);
        let participationId = this.state.participants[event.target.id]["participationId"];
        console.log(participationId);
        let badgeId = this.props.opportunity.badgeId;
        let date = new Date();
        let month = ""+(date.getMonth()+1);
        if(month.length==1){
            month="0"+month;
        }
        let day = ""+(date.getDate());
        if(day.length==1){
            day="0"+day;
        }
        let today = date.getFullYear()+"-"+month+"-"+day;
        console.log(today);
        let assertion = new Object();
        assertion["badge"] = badgeId;
        assertion["badgeId"] = badgeId;
        assertion["id"] = "";
        assertion["issuedOn"] = today;
        assertion["recipient"] = participantId;
        assertion["recipientId"] = participantId;
        assertion["type"] = "Assertion";
        assertion["verification"] = badgeId;
        console.log("posting assertion:");
        console.log(JSON.stringify(assertion));
		firestore.createNewAssertion(assertion).catch(err => {
            console.log("failed creating assertion:"+err);
        });;
		var self = this;
        firestore.completeParticipation(participationId)
			.then( res =>{
				self.loadParticipants();
			})
			.catch(err => {
				console.log("failed completing participation:", err);
			});
        // this.loadParticipants();
    }

    accept(event) {
        event.preventDefault();
        var self = this;
        firestore.acceptParticipation(event.target.id)
        .then( res =>{
            self.loadParticipants();
        })
        .catch(err => {
            console.log("failed accepting participation:", err);
        });
        // self.loadParticipants();
    }
    reject(event) {
        event.preventDefault();
        var self = this;
        firestore.rejectParticipation(event.target.id)
        .then( res =>{
            self.loadParticipants();
        })
        .catch(err => {
            console.log("failed rejecting participation:"+err);
        });  
        // self.loadParticipants();
    }
    undo(event) {
        event.preventDefault();
        var self = this;
        firestore.undoParticipation(event.target.id)
        .then( res =>{
            self.loadParticipants();
        })
        .catch(err => {
            console.log("failed rejecting participation:"+err);
        });  
        // self.loadParticipants();
    }

    render() {

        const {participant} = this.props;

        return (
            <tr className='participant'>
            <td>
                <div className="table-el">{participant.name}</div>
            </td>
            <td>
                <div className="table-el">{participant.education}</div>
            </td>
            <td>
                <div className="table-el">{participant.email}</div>
            </td>

            { participant.participationStatus===0 && <td><div className="table-el">In afwachting</div></td>}
            { participant.participationStatus===1 && <td><div className="table-el">Goedgekeurd</div></td>}
            { participant.participationStatus===2 && <td><div className="table-el">Geweigerd</div></td>}
            { participant.participationStatus===3 && <td><div className="table-el">Afgewerkt</div></td>}
            { participant.participationStatus===0 && 
                <td><div className="table-el">
                    <button onClick={this.accept} id={participant.participationId}>Accepteer</button>
                    <button onClick={this.reject} id={participant.participationId}>Weiger</button>
                </div></td>
            }
            { participant.participationStatus===1 && <td><div className="table-el"><button onClick={this.giveBadge}>Geef badge</button></div></td>}
            { participant.participationStatus===2 && <td><div className="table-el"><button onClick={this.undo}>Maak ongedaan</button></div></td>}
        </tr>
        );
    }
}

const LoadingList = () =>
	<div>
		<Spinner />
	</div>

export default List;