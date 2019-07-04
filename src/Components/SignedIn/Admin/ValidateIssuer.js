import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import { firestore } from '../../../Utils/Firebase';

import BadgrContext from '../../../Shared/BadgrContext';

import Spinner from '../../../Shared/Spinner';

class ValidateIssuer extends Component {
    constructor() {
        super();
        // this.submit = this.submit.bind(this);
        this.state = {
            issuers: null,
        };
        this.getIssuers = this.getIssuers.bind(this);
    }

    componentDidMount() {
        this.getIssuers();
        window.scrollTo(0, 0);
    }
    getIssuers() {
        firestore.onceGetNonValidatedIssuers().then(snapshot => {
            var res = new Object();
            snapshot.forEach(doc => {
                res[doc.id] = doc.data();
            });
            this.setState(() => ({ issuers: res }))
        })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }
    render() {
        const { issuers } = this.state;

        return (
            <React.Fragment>
                <BadgrContext.Consumer>
                    {badgrAuth => badgrAuth != undefined
                        ? <React.Fragment>
                            {!!issuers && <IssuersList issuers={issuers} getIssuers={this.getIssuers} badgrAuth={badgrAuth} />}
                            {!!issuers && Object.getOwnPropertyNames(issuers).length === 0 && <EmptyList />}
                            {!issuers && <Loading />}
                        </React.Fragment>
                        : <Loading />
                    }
                </BadgrContext.Consumer>
            </React.Fragment>
        );
    }
}

class IssuersList extends Component {
    constructor(props) {
        super(props);

        this.state = { badgrIssuers: null };

        this.handleClick = this.handleClick.bind(this);
    };

    // componentDidUpdate(prevState) {
    //     if (this.state.badgrIssuers != null) {
    //         if(prevState.badgrIssuers != null && this.state.badgrIssuers[0]==prevState.badgrIssuers[0]){}
    //         else{
    //             this.deleteIssuer(this.state.badgrIssuers[0].entityId);
    //         }
    //     }
    // }

    handleClick(event) {
        // console.log(event.target.id);
        this.createBadgrIssuer(event.target.id);
        this.props.getIssuers();
    }

    createBadgrIssuer(id) {

        function urlify(s) {
            let prefix = 'http://';
            let prefix2 = 'https://';
            if (s.substr(0, prefix.length) !== prefix && s.substr(0, prefix2.length) !== prefix2) {
                s = prefix + s;
            }
            return s;
        }

        console.log("Trying to create badgr issuer...");
        let accessToken = this.props.badgrAuth.accessToken;
        let header = { headers: { Authorization: "Bearer " + accessToken } };
        let issuer = this.props.issuers[id];
        let url = urlify(issuer.url);
        console.log(url);

        let data = {
            name: issuer.name,
            email: "freek.de.sagher21@gmail.com", // TODO: change to gentlestudent
            description: "Phone: " + issuer.phonenumber,
            url: url
        };

        axios.post("https://api.badgr.io/v2/issuers", data, header)
        .then(res => {
            console.log("Created badgr issuer", res);
            firestore.updateIssuerBadgrId(id, res.data.result[0].entityId);
            firestore.validateIssuer(id);
        })
        // .catch(err => console.error(err));
        // console.log("fetching issuers");
        // axios.get("https://api.badgr.io/v2/issuers", header)
        //     .then(res => {
        //         console.log(res);
        //         this.setState({ badgrIssuers: res.data.result });
        //     }).catch(err => {
        //         console.log(err);
        //         // console.log(this.state.access_token);
        //     });
    }

    deleteIssuer(issuerID) {
        console.log(issuerID);
        let accessToken = this.props.badgrAuth.accessToken;
        let header = { headers: { Authorization: "Bearer " + accessToken } };
        console.log("deleting issuer");
        axios.delete("https://api.badgr.io/v2/issuers/" + issuerID, header).
            then(res => console.log(res))
            .catch(err => console.error(err));
    }

    render() {
        const { issuers } = this.props;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="content">
                        <Link to="/" className="back">&lt; Terug</Link>
                        <h1>Valideer Issuer</h1>
                        <div className="card-container issuers">
                            {Object.keys(issuers).map(key =>
                                <div className={`card-item issuer`} key={issuers[key].addressId}>
                                    <h2>{issuers[key].name}</h2>
                                    <div className="meta-data">
                                        <small>institutie:{issuers[key].institution}</small>
                                        <small>tel.:{issuers[key].phonenumber}</small>
                                        <small>url:{issuers[key].url}</small>
                                        <button onClick={this.handleClick} id={key}>Accepteren</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


const EmptyList = () =>
    <div>
        <div className="container">
            <div className="content">
                Er zijn geen te valideren issuers.
            </div>
        </div>
    </div>

const Loading = () =>
    <div>
        <Spinner />
    </div>

export default ValidateIssuer;
