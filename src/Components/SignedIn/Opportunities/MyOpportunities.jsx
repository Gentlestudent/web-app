import React, { Component } from "react";
import { firestore } from "../../../Utils/Firebase";
import firebase from "firebase/app";
import "firebase/auth"
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

  handleClaim() {
    console.log("badge claimed");
  }

  render() {
    const { opportunityList, loading, participations } = this.state;
    //console.log(participations);
    const opps = opportunityList.map((opp, key) => (
      <li key={opp.id} className="card-container opportunities">
        <a
          className={`card-item opportunity ${opp.category}`}
          href={`/opportunities/${opp.id}`}
          key={opp.addressId}
        >
          <div className="crop-opp-img">
            <img
              src={opp.oppImageUrl ? `${opp.oppImageUrl}` : null}
              className="photo"
              alt=""
            />
          </div>
          <div>
            <div style={{ position: "relative" }}>
              <img src={`${opp.pinImageUrl}`} className="badge" alt="" />
              <h2>{opp.title}</h2>
              <div className="meta-data">
                <small>{opp.beginDate + " tot " + opp.endDate}</small>
                {/* <small>{opp.street + ' ' + opp.house_number + ', ' + opp.postal_code + ' ' + opp.city}</small> */}
              </div>
              <p>{opp.shortDescription}</p>
            </div>
          </div>
        </a>
      </li>
    ));

    return (
      <div className="main-content">
        <h1>Mijn Leerkansen</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="opportunities-content">
            <div className="content">
              <div id="opportunities">
                <ul className="list-opportunities">{opps}</ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MyOpportunities;
