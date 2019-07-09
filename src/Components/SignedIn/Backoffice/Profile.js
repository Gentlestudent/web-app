import React, { Component } from 'react';

import { firestore } from '../../../Utils/Firebase';
import firebase from 'firebase';

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // birthdate:"",
            // education:"",
            email: "",
            institute: "",
            name: "",
            pic: "",
            requestedIssuer: false,
            isIssuer: false,
            isAdmin: false,
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        var self = this
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let id = user.uid;
                // console.log(id);
                firestore.onceGetParticipant(id).then(doc => {
                    if (doc.data()) {
                        // self.setState(() => ({ birthdate: doc.data().birthdate }));
                        // self.setState(() => ({ education: doc.data().education }));
                        self.setState(() => ({ email: doc.data().email }));
                        self.setState(() => ({ institute: doc.data().institute }));
                        self.setState(() => ({ name: doc.data().name }));
                        if (doc.data().profilePicture) {
                            self.setState(() => ({ pic: doc.data().profilePicture }));
                        }
                    }
                })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });
                firestore.onceGetIssuer(id).then(doc => {
                    if (doc.data()) {
                        self.setState(() => ({ requestedIssuer: true }));
                        if (doc.data().validated) {
                            self.setState(() => ({ isIssuer: true }));
                            self.setState(() => ({ requestedIssuer: false }));
                        }
                    }
                })
                    .catch(err => {
                        console.log('User is not an issuer', err);
                    });
                firestore.onceGetAdmin(id).then(doc => {
                    if (doc.data()) {
                        self.setState(() => ({ isAdmin: true }));
                    }
                })
                    .catch(err => {
                        console.log('User is not an admin', err);
                    });
            }
        });
    }
    render() {
        return (
            <React.Fragment>
                {/* <div className="container"> */}
                <div className="profile-page">
                    <div className="profile">
                        <div className="half left">
                            {this.state.pic !== "" && <img src={this.state.pic} alt="" />}
                            <span className="name">{this.state.name}</span>
                        </div>
                        <div className="half right">
                            <div className="info">
                                <span className="title">Email</span>
                                <i className="desc">{this.state.email}</i>
                                {/* <span className="title">Geboortedatum</span> */}
                                {/* <i className="desc">{this.state.birthdate}</i> */}
                                <span className="title">Organisatie/onderwijsinstelling</span>
                                <i className="desc">{this.state.institute}</i>
                                {/* <span className="title">Educatie</span> */}
                                {/* <i className="desc">{this.state.education}</i> */}
                                {(!!this.state.requestedIssuer || !!this.state.isIssuer || !!this.state.isAdmin) &&
                                    <React.Fragment>
                                        <span className="title">Rollen</span>
                                        {this.state.requestedIssuer && <i className="desc">Issuer status aangevraagd</i>}
                                        {this.state.isIssuer && <i className="desc">Gevalideerde issuer</i>}
                                        {this.state.isAdmin && <i className="desc">Admin</i>}
                                    </React.Fragment>
                                }
                                <span className="title">Backpack</span>
                                <i className="desc"><a href="/backpack">Ga naar backpack</a></i>
                            </div>
                        </div>
                    </div>
                    {/* <h1>Mijn profiel</h1>
            <ul>
                <li>Naam: {this.state.name}</li>
                <li>Geboortedatum: {this.state.birthdate}</li>
                <li>Email: {this.state.email}</li>
                <li>Institutie: {this.state.institute}</li>
                <li>Educatie: {this.state.education}</li>
                <br/>
                <ul>Rollen:

                {this.state.requestedIssuer && <li>Issuer status aangevraagd</li>}
                {this.state.isIssuer && <li>Gevalideerde issuer</li>}
                {this.state.isAdmin && <li>Admin</li>}
                {!this.state.requestedIssuer && !this.state.isIssuer && !this.state.isAdmin && <li>Geen</li>}
                </ul>
            </ul> */}
                </div>
                {/* </div> */}
            </React.Fragment>
        )
    }
}

export default Profile;