import React, { Component } from "react";
import { firestore } from "../../../Utils/Firebase";
import firebase from "firebase";
import Spinner from "../../../Shared/Spinner";

class MyOpportunities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participations: {},
      opportunityId: "",
      opportunity: {},
      opportunityList: [],
      loading: true
    };
  }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let participantId = user.uid;
        console.log(`user id is ${participantId}`);
        firestore
          .onceGetParticipations(participantId)
          .then(snapshot => {
            let res = {};
            const opportunityIds = [];
            snapshot.forEach(doc => {
              res[doc.id] = doc.data();
              opportunityIds.push(res[doc.id].opportunityId);
              //this.getOpportunity(res[doc.id].opportunityId);
              // rawOpportunities.push
            });
            const queue = opportunityIds.map(id => {
              return this.getOpportunity(id);
            });
            Promise.all(queue).then(opportunityList => {
              opportunityList = opportunityList.map(snapshot => {
                let opp = snapshot.data();
                opp.id = snapshot.id;
                return opp;
              });
              this.setState(() => ({
                participations: res,
                loading: false,
                opportunityList
              }));
            });
          })
          .catch(err => {
            console.log("Error getting documents", err);
          });
      }
    });
  }

  getOpportunity(opportunityId) {
    return firestore.onceGetOpportunity(opportunityId).catch(err => {
      console.log("Error getting opportunities", err);
    });
  }

  render() {
    const { opportunityList, loading } = this.state;
    //console.log(opportunityList);
    const opps = opportunityList.map((opp, key) =>
    <li key= {opp.id}>{opp.title}</li>);

    return (
      <div className="main-content">
        <h1>Mijn Leerkansen</h1>
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            {opps}
          </ul>
        )}
      </div>
    );
  }
}

export default MyOpportunities;
