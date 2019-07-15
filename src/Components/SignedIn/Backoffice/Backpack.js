import React, { Component } from 'react';

import { firestore } from '../../../Utils/Firebase';

import firebase from 'firebase/app'
import 'firebase/auth'

import downloadAndroid from '../../../assets/android.png';
import downloadiOS from '../../../assets/ios.png';

import Spinner from '../../../Shared/Spinner';

class Backpack extends Component {
    constructor(props) {
        super(props)

        this.state = {
            backpack: null,
            isEmpty: true,
            loading: true
        }

        this.downloadBadge = this.downloadBadge.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        let self = this;
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                let id = user.uid;
                // console.log(id);
                //fetching assertions
                 firestore.onceGetAssertions(id).then(async snapshot => {
                    let res = {};
                    await snapshot.forEach(doc => {
                        this.setState({isEmpty: false})
                        let key = doc.id;
                        res[key] = doc.data();
                        firestore.onceGetBadge(res[key].badgeId).then(doc => {
                            res[key]['badge'] = doc.data();
                            self.setState(() => ({ backpack: res }));
                        }).catch(err => {
                            console.log('Error getting document', err);
                        });
                    });
                    this.setState({loading: false})
                })
                    .catch(err => {
                        console.log('Error getting documents', err);
                    });
            }
        })
        
    }

    downloadBadge(event) {


        function getUrl(id) {
            return "https://badgr.io/public/assertions/" + id + "?action=download";
        }
        let badgrID = event.currentTarget.value;
        if (badgrID === undefined || badgrID === null || badgrID === "") {
            console.log("Assertion was created before badgr support. No badgr ID was found, aborting...");
            return;
        }

        let url = getUrl(badgrID);
        window.open(url, "_blank");
    }

    render() {
        const { backpack, isEmpty, loading } = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="content content-with-padding">
                        <h1>Backpack</h1>
                        {!!backpack && <div className="backpack">
                            {Object.keys(backpack).map(key =>
                                <div className="backpack-item" key={key}>
                                    <img alt="badgeIMG" src={backpack[key]['badge'].image ? `${backpack[key]['badge'].image}` : null} />
                                    <button className="download-badge" onClick={this.downloadBadge} value={backpack[key].badgrId}>Download</button>
                                </div>
                            )}
                        </div>}
                        {loading ? <LoadingList />
                            : (
                                <React.Fragment>
                                    {!backpack && <div className="backpack">
                                        {!!isEmpty && <EmptyList />}
                                        {!isEmpty && <LoadingList />}
                                    </div>}
                                </React.Fragment>
                            )
                        }

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const LoadingList = () =>
    <div>
        <Spinner />
    </div>

const EmptyList = () =>
    <div>
        <p>Je hebt nog geen badges verdiend! Ga aan de slag door de mobile app te downloaden:</p>
        <a href="https://itunes.apple.com/us/app/gentlestudent/id1417851918?mt=8&ign-mpt=uo%3D4" target="_blank" rel="noopener noreferrer">
            <img src={downloadiOS} alt="download-button-ios" />
        </a>
        <a href="http://play.google.com/store/apps/details?id=gent.gentlestudent" target="_blank" rel="noopener noreferrer">
            <img src={downloadAndroid} alt="download-button-android" />
        </a>
    </div>

export default Backpack;