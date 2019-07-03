import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const badgr_api = `https://api.badgr.io/`;

function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      access_token: null,
      expiration: -1,
      refresh_token: null,
      issuers: null
    };

    this.getIssuers = this.getIssuers.bind(this);

  }
  componentDidMount() {
    // let data = {username: 'van-driessche-maxime@hotmail.com', password: 'osocosoc'};
    let data = "username=freek.de.sagher21@gmail.com&password=summerofcode2019";
    let self = this;
    console.log("fetching tokens");
    axios.post(badgr_api + 'o/token', data)
      .then(res => {
        // console.log(res);
        self.setState({
          access_token: res.data.access_token,
          expiration: res.data.expires_in,
          refresh_token: res.data.refresh_token
        }
        );
      }
      ).catch(err => {
        console.log(err);
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.access_token === null) {
      // this.createIssuer();

      this.getIssuers();
      // this.getBadgeClasses();
      // console.log(issuers);
      // let id = issuers[0].entityId;
      // console.log(id);
    }
    // if(this.state.issuers !== null && this.state.issuers.length > 0){
    //   let issuers = this.state.issuers;
    //   while(issuers.length > 0){
    //     this.deleteIssuer(issuers[issuers.length-1].entityId);
    //     issuers.pop();
    //   }
    // }
    if (this.state.issuers !== null && this.state.issuers.length > 0) {
      this.createBadgeClass();
    }
  }
  getBackpack() {
    console.log("fetching back pack");
    axios.get(badgr_api + 'v2/backpack/assertions', { headers: { Authorization: "Bearer " + this.state.access_token } })
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
        // console.log(this.state.access_token);
      });
  }
  createIssuer() {
    console.log("creating issuer");
    let data = {
      name: "test user",
      entityId: "companyhisemailcom",
      email: "freek.de.sagher21@gmail.com",
      description: "test",
      url: "https://www.google.com"
    };
    axios.post(badgr_api + 'v2/issuers', data, { headers: { Authorization: "Bearer " + this.state.access_token } })
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
        // console.log(this.state.access_token);
      });
  }

  getIssuers() {
    console.log("fetching issuers");
    axios.get(badgr_api + 'v2/issuers', { headers: { Authorization: "Bearer " + this.state.access_token } })
      .then(res => {
        console.log(res);
        this.setState({ issuers: res.data.result });
      }).catch(err => {
        console.log(err);
        // console.log(this.state.access_token);
      });
  }

  deleteIssuer(issuerID) {
    console.log("deleting issuer");
    axios.delete(badgr_api + 'v2/issuers/' + issuerID, { headers: { Authorization: "Bearer " + this.state.access_token } }).
      then(res => console.log(res))
      .catch(err => console.error(err));
  }

  createBadgeClass() {
    let self = this;
    toDataUrl("https://raw.githubusercontent.com/FreekDS/Wof/master/res/player0.png", function (myBase64) {
      console.log(myBase64); // myBase64 is the base64 string
      let data = {
        name: "toffe badge 2.0",
        description: "heel toffe badge om te hebben, nog maar is",
        issuer: self.state.issuers[0].entityId,
        image: myBase64,
        criteriaNarrative: "narrative"
      }
      axios.post(badgr_api + 'v2/badgeclasses', data, { headers: { Authorization: "Bearer " + self.state.access_token } })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
  }

  getBadgeClasses() {

    axios.get(badgr_api + "v2/badgeclasses", { headers: { Authorization: "Bearer " + this.state.access_token } })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        test
      </div>
    )
  }
}

export default App;
