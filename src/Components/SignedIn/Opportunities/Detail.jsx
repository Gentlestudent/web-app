import React, { Component } from "react";
import ReactHtmlParser from 'react-html-parser';

import List from "../Issuer/Participants";

import Spinner from "../../../Shared/Spinner";

import { auth, firestore } from "../../../Utils/Firebase";
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
      participation: {}
    };
  }

  handleRegister = event => {
    event.preventDefault();
    let data = {
      participantId: auth.getUserId(),
      opportunityId: this.props.id,
      status: 0,
      reason: "",
      message: ""
    };
    console.log(data);
    firestore.createNewParticipation(data);
    console.log("geregistreerd voor leerkans");
  };

  handleClaim = event => {
    event.preventDefault();
    let data = {
      badgeId: this.props.opportunity.badgeId,
      issuedOn: "2000-01-01",
      recipientId: auth.getUserId()
    };
    console.log(data, this.state.participation.id);
    firestore.createNewAssertion(data).completeParticipation(this.state.participation.id);
    console.log("badge geclaimed");
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
      participation
    } = this.state;
    console.log(participation.participantId, auth.getUserId());

    let longOpportunityWithLinks = ReactHtmlParser(Urlify(opportunity.longDescription));
    let shortOpportunityWithLinks = ReactHtmlParser(Urlify(opportunity.shortDescription));

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
              <p>{longOpportunityWithLinks}</p>
              <h3>Wat wordt er verwacht?</h3>
              <p>{shortOpportunityWithLinks}</p>
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
                        <td><a href={opportunity.website.startsWith("http") ? opportunity.website : "https://" + opportunity.website}> {opportunity.website} </a></td>
                      </tr>
                      <tr>
                        <td>
                          <b>Contact:</b>
                        </td>
                        <td><a href={"mailto:"+opportunity.contact}> {opportunity.contact} </a></td>
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
                      participation.opportunityId == this.props.id &&
                      participation.participantId == auth.getUserId() ? (
                        participation.status == 3 ? (
                          <p>Je hebt deze leerkans al voltooid.</p>
                        ) : this.props.opportunity.difficulty == 0 ? (
                          <button className="button-prim" onClick={this.handleClaim}>Claim jouw badge</button>
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

const Urlify = (text) => {
  let urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  return text.replace(urlRegex, (url) => `<a href=${url.startsWith('http') ? url : 'https://'+url}> ${url} </a>`);
}

export default Detail;
