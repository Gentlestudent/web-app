import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { firestore, functions } from "../../../Utils/Firebase";
import BadgrContext from "../../../Shared/BadgrContext";
import Spinner from "../../../Shared/Spinner";
import { badgr_email } from "../../../Shared/withBadgr"

class ValidateIssuer extends Component {
  constructor() {
    super();
    // this.submit = this.submit.bind(this);
    this.state = {
      issuers: null
    };
    this.getIssuers = this.getIssuers.bind(this);
  }

  componentDidMount() {
    this.getIssuers();
    window.scrollTo(0, 0);
  }

  getIssuers() {
    firestore
      .onceGetNonValidatedIssuers()
      .then(snapshot => {
        let res = {};
        snapshot.forEach(doc => {
          res[doc.id] = doc.data();
        });
        this.setState(() => ({ issuers: res }));
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  render() {
    const { issuers } = this.state;

    return (
      <React.Fragment>
        <BadgrContext.Consumer>
          {badgrAuth =>
            badgrAuth !== undefined ? (
              <React.Fragment>
                {!!issuers && (
                  <IssuersList
                    issuers={issuers}
                    getIssuers={this.getIssuers}
                    badgrAuth={badgrAuth}
                  />
                )}
                {!!issuers &&
                  Object.getOwnPropertyNames(issuers).length === 0 && (
                    <EmptyList />
                  )}
                {!issuers && <Loading />}
              </React.Fragment>
            ) : (
                <Loading />
              )
          }
        </BadgrContext.Consumer>
      </React.Fragment>
    );
  }
}

class IssuersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badgrIssuers: null,
      load: false,
      currentlyUpdating: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.createIssuer = this.createIssuer.bind(this);
    this.deleteIssuer = this.deleteIssuer.bind(this);
  };

  handleClick(event) {
    // console.log(event.target.id);
    this.createIssuer(event.target.id);
    this.props.getIssuers();
  }

  createIssuer(id, tries = 0) {

    if (tries >= 3) {
      let error = {
        name: "Failed to refresh access token",
        message: "An internal error occurred, contact a system admin",
        function: this.createIssuer,
        status: 500
      }
      throw error;
    }

    function urlify(s) {
      let prefix = 'http://';
      let prefix2 = 'https://';
      if (s.substr(0, prefix.length) !== prefix && s.substr(0, prefix2.length) !== prefix2) {
        s = prefix + s;
      }
      return s;
    }

    // console.log("Trying to create badgr issuer...");
    // let accessToken = this.props.badgrAuth.accessToken;
    // let header = { headers: { Authorization: "Bearer " + accessToken } };
    // let header = this.props.badgrAuth.getHeader();

    let issuer = this.props.issuers[id];
    let url = urlify(issuer.url);

    // console.log("Issuer data", issuer);

    let desc = "Institution: " + issuer.institution + " - " +
      "Email: " + issuer.email + " - " +
      "Phone: " + issuer.phonenumber;

    let issuerData = {
      name: issuer.name,
      email: badgr_email,
      description: desc,
      url: url
    };

    this.setState({ load: true, currentlyUpdating: id });
    functions.createBadgrIssuer({
      issuerData
    })
      .then(result => {
        let entityId = result.data.createdIssuer.entityId;
        firestore.updateIssuerBadgrId(id, entityId);
        firestore.validateIssuer(id).then(() => {
          this.setState({ load: false, currentlyUpdating: null });
          this.props.getIssuers();
        });
      })
      .catch(err => {
        switch (err.code) {
          case "permission-denied":
            // permission-denied is thrown when an expired access token is used
            console.log("Access token expired, refreshing... (tried: [" + (tries + 1).toString() + "] time(s))");
            functions.refreshAccessToken().then(() => {
              this.createIssuer(id, tries++);
            })
              .catch(err => {
                throw err;
              });
            break;
          default:
            console.error("Error occurred while trying to validate issuer", { err });
        }
      });
  }

  deleteIssuer(issuerID) {
    console.log(issuerID);
    let accessToken = this.props.badgrAuth.accessToken;
    let header = { headers: { Authorization: "Bearer " + accessToken } };
    console.log("deleting issuer");
    axios
      .delete("https://api.badgr.io/v2/issuers/" + issuerID, header)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  render() {
    const { issuers } = this.props;
    const load = this.state.load;
    // const currentlyUpdating = this.state.currentlyUpdating;

    return (
      <React.Fragment >
        <div className="container">
          <div className="content">
            <Link to="/" className="back">
              &lt; Terug
            </Link>
            <h1>Valideer Issuer</h1>
            <div className="card-container issuers">
              {Object.keys(issuers).map(key => (
                <div
                  className={`card-item issuer`}
                  key={issuers[key].email}
                >
                  <h2>{issuers[key].name}</h2>
                  <div className="issuer-data">
                    <table className="table--issuers-info">
                      <tbody>
                        <tr className="row--issuers-info">
                          <th className="tablehead--issuers-info">Institutie:</th>
                          <td className="tabledata--issuers-info">
                            {issuers[key].institution}
                          </td>
                        </tr>
                        <tr className="row--issuers-info">
                          <th className="tablehead--issuers-info">Tel:</th>
                          <td className="tabledata--issuers-info">
                            {issuers[key].phonenumber}
                          </td>
                        </tr>
                        <tr className="row--issuers-info">
                          <th className="tablehead--issuers-info">URL:</th>
                          <td className="tabledata--issuers-info">
                            {issuers[key].url}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* <div> */}
                    <button
                      disabled={load}
                      className="button--issuer-accept"
                      onClick={this.handleClick}
                      id={key}
                    >
                      Accepteren
                    </button>
                    {/* {load && currentlyUpdating !== null && key === currentlyUpdating && */}
                    {/* </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment >
    );
  }
}

const EmptyList = () => (
  <div>
    <div className="container">
      <div className="content">Er zijn geen te valideren issuers.</div>
    </div>
  </div>
);

const Loading = () => (
  <div>
    <Spinner />
  </div>
);





export default ValidateIssuer;
