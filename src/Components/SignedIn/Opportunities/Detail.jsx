import React, { Component } from "react";

import List from "../Issuer/Participants";

import Spinner from "../../../Shared/Spinner";

import { auth, firestore, functions } from "../../../Utils/Firebase";
import NoMatch from "../../../Shared/NoMatch";

import AuthUserContext from "../../../Shared/AuthUserContext";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunity: null,
      id: this.props.match.params.id,
      loading: true
    };
  }
  componentDidMount() {
    if (
      this.props.opportunities === undefined ||
      this.props.opportunities === null
    ) {
      firestore
        .onceGetOpportunity(this.state.id)
        .then(doc => {
          if (doc.data()) {
            this.setState(() => ({ opportunity: doc.data(), loading: false }));
          } else {
            this.setState(() => ({ opportunity: null, loading: false }));
          }
        })
        .catch(err => {
          console.log("Could not fetch opportunity data: ", err);
        });
    } else {
      this.setState(() => ({
        opportunity: this.props.opportunities[this.state.id],
        loading: false
      }));
    }
  }
  render() {
    const { opportunity, id, loading } = this.state;

    return (
      <React.Fragment>
        {!loading && !!opportunity && (
          <OpportunityDetail opportunity={opportunity} id={id} />
        )}
        {!loading && !opportunity && <NoMatch />}
        {loading && <EmptyList />}
      </React.Fragment>
    );
  }
}

class OpportunityDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: null,
      cat: "",
      diff: "",
      issuer: null,
      userHasRights: false,
      isAdmin: false,
      participations: 0,
      participation: {},
      participant: {},
      badgrBadgeClassId: "",
      assertion: null
    };

    this.postBadgrBadge = this.postBadgrBadge.bind(this);
    this.giveBadge = this.giveBadge.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
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

    let email = this.state.participant.email;
    // console.log("Participant email: ", email);

    let participationId = this.state.participation.id;
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
            console.log(this.state.participant);
            firestore.createNewAssertion(assertion).catch(err => console.error(err));
            firestore.completeParticipation(participationId)
                .then(res => {
                    console.log("Completed participation", res);
                    this.setState({
                        assertion: null,
                        badgrBadgeClassID: ""
                    })
                });
        })
        .catch(err => {
            switch (err.status) {
                case "permission-denied":
                    // permission-denied is thrown when an expired access token is used
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
}

  handleRegister = async event => {
    event.preventDefault();
    let data = {
      participantId: auth.getUserId(),
      opportunityId: this.props.id,
      status: 0,
      reason: "",
      message: ""
    };
    console.log(data);
    await firestore.createNewParticipation(data);
    console.log("geregistreerd voor leerkans");
    window.location.reload();
  };

  giveBadge(event) {
    event.preventDefault();

    let participant = this.state.participant;
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
    console.log("EIOEI", participant);
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

  componentDidMount() {
    let userId = auth.getUserId();
    let self = this;
    if (userId !== "") {
      if (this.props.opportunity.issuerId === userId) {
        this.setState(() => ({ userHasRights: true }));
      }
      firestore
        .onceGetAdmin(userId)
        .then(doc => {
          if (doc.data()) {
            self.setState(() => ({ userHasRights: true, isAdmin: true }));
            firestore
              .onceGetAmountParticipations(self.props.id)
              .then(participations => {
                let amount = self.state.participations + participations.size;
                self.setState(() => ({ participations: amount }));
              });
            firestore
              .onceGetAmountParticipationsRejected(self.props.id)
              .then(participations => {
                let amount = self.state.participations - participations.size;
                self.setState(() => ({ participations: amount }));
              });
          }
        })
        .catch(err => {
          console.log("User is not an admin", err);
        });
    }

    switch (this.props.opportunity.category) {
      case 0:
        this.setState({ cat: "Digitale Geletterdheid" });
        break;
      case 1:
        this.setState({ cat: "Duurzaamheid" });
        break;
      case 2:
        this.setState({ cat: "Ondernemingszin" });
        break;
      case 3:
        this.setState({ cat: "Onderzoekende houding" });
        break;
      case 4:
        this.setState({ cat: "Wereldburgerschap" });
        break;
      default:
        break;
    }

    switch (this.props.opportunity.difficulty) {
      case 0:
        this.setState({ diff: "Beginner" });
        break;
      case 1:
        this.setState({ diff: "Intermediate" });
        break;
      case 2:
        this.setState({ diff: "Expert" });
        break;
      default:
        break;
    }

    firestore
      .onceGetAddress(this.props.opportunity.addressId)
      .then(snapshot => {
        // console.log(JSON.stringify(snapshot.data()));
        this.setState(() => ({ address: snapshot.data() }));
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    firestore
      .onceGetIssuer(this.props.opportunity.issuerId)
      .then(snapshot => {
        // console.log(JSON.stringify(snapshot.data()));
        this.setState(() => ({ issuer: snapshot.data() }));
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    firestore
      .onceGetParticipationFromOpportunity(this.props.id, userId)
      .then(snapshot => {
        snapshot.forEach(doc => {
          let participation = doc.data();
          participation.id = doc.id;
          this.setState(() => ({ participation }));
          console.log(participation.participantId);

          if (this.state.participation !== undefined) {
            firestore
            .onceGetParticipant(this.state.participation.participantId)
            .then(doc => {
              let participant = doc.data();
              participant.id = doc.id;
                this.setState(() => ({ participant }));
                console.log(participant);
            })
            .catch(err => {
              console.log("Error getting documents", err);
            });
          }
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }


  render() {
    const { opportunity, id } = this.props;

    const {
      address,
      issuer,
      userHasRights,
      isAdmin,
      participations,
      participation,
    } = this.state;

    return (
      <div className="opportunity-detail">
        {!!opportunity.authority === 0 && (
          <div className="opportunity-page-warning">
            <p>
              <i className="fas fa-exclamation" /> Dit is een preview van hoe de
              detailpagina van jouw leerkans er zal uitzien. Andere gebruikers
              zullen deze pagina pas kunnen zien wanneer de leerkans goedgekeurd
              is.
            </p>
          </div>
        )}
        <div className="overlay" />
        <div
          className="titlehead-wrapper"
          style={{ backgroundImage: `url(${opportunity.oppImageUrl})` }}
        >
          <div className="titlehead">
            <div className="opportunity-container">
              <h1>{opportunity.title}</h1>
            </div>
          </div>
        </div>
        <div id="page" className="opportunity-container">
          {/* <a href="/opportunities" className="back">&lt; Terug</a> */}

          <img
            className="badge"
            src={opportunity.pinImageUrl}
            alt="Opportunity pin img"
          />
          {!!opportunity.authority === 0 && (
            <div style={{ display: "flex" }}>
              {!!userHasRights && (
                <a
                  className="opp-detail-option"
                  href={"/issuer/bewerk-leerkans/" + id}
                >
                  Bewerken
                </a>
              )}
              {!!isAdmin && (
                <a
                  className="opp-detail-option"
                  href="/admin/validate-leerkans"
                >
                  Goedkeuren
                </a>
              )}
            </div>
          )}
          <div className="content content-flex">
            <div className="content-left">
              <h3>Beschrijving</h3>
              <p>{opportunity.longDescription}</p>
              <h3>Wat wordt er verwacht?</h3>
              <p>{opportunity.shortDescription}</p>
              {!!opportunity.moreInfo && <h3>Meer weten?</h3>}
              {!!opportunity.moreInfo && (
                <p>
                  {" "}
                  <a href={opportunity.moreInfo}>Klik hier</a> om meer te weten.
                </p>
              )}
            </div>
            <div className="content-right opportunity-info-btn">
              <br />
              <div className="infobox">
                <h3>Info:</h3>
                <div className="infobox-content">
                  <table>
                    <tbody>
                      {!!issuer && (
                        <tr>
                          <td>
                            <b>Organisatie:</b>
                          </td>
                          <td>{issuer.name}</td>
                        </tr>
                      )}
                      <tr>
                        <td>
                          <b>Website:</b>
                        </td>
                        <td>{opportunity.website}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Contact:</b>
                        </td>
                        <td>{opportunity.contact}</td>
                      </tr>
                      {!!address && (
                        <tr>
                          <td>
                            <b>Locatie:</b>
                          </td>
                          <td>
                            {address.street} {address.housenumber},{" "}
                            {address.postalcode} {address["city"]}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td>
                          <b>Periode:</b>
                        </td>
                        <td>
                          {opportunity.beginDate +
                            " tot en met " +
                            opportunity.endDate}
                        </td>
                      </tr>
                      {!!userHasRights && (
                        <tr>
                          <td>
                            <b>Status:</b>
                          </td>
                          {!!opportunity.authority === 0 && (
                            <td>In afwachting</td>
                          )}
                          {!!opportunity.authority === 1 && (
                            <td>Goedgekeurd</td>
                          )}
                          {!!opportunity.authority === 2 && <td>Verwijderd</td>}
                        </tr>
                      )}
                      {!!userHasRights && (
                        <tr>
                          <td>
                            <b>Aantal deelnemers:</b>
                          </td>
                          <td>{participations}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <AuthUserContext.Consumer>
                  {authUser =>
                    authUser ? (
                      participation.opportunityId === this.props.id &&
                      participation.participantId === auth.getUserId() ? (
                        participation.status === 3 ? (
                          <p>Je hebt deze leerkans al voltooid.</p>
                        ) : this.props.opportunity.difficulty === 0 ? (
                          <button
                            className="button-prim"
                            onClick={this.giveBadge}
                          >
                            Claim jouw badge
                          </button>
                        ) : (
                          <p>Je hebt je al ingeschreven voor deze badge!</p>
                        )
                      ) : (
                        <button
                          className="button-prim"
                          onClick={this.handleRegister}
                        >
                          Registreer
                        </button>
                      )
                    ) : (
                      <React.Fragment>
                        <button
                          className="button-prim disabled"
                          type="button"
                          disabled
                        />
                        <small>Je moet ingelogd zijn om deel te nemen.</small>
                      </React.Fragment>
                    )
                  }
                </AuthUserContext.Consumer>
              </div>
            </div>
          </div>
          {!!userHasRights && <List opportunity={opportunity} id={id} />}
        </div>
        <br />
        <br />
      </div>
    );
  }
}

const EmptyList = () => (
  <div>
    <Spinner />
  </div>
);

export default Detail;
