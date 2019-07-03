import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const badgr_api = `https://api.badgr.io/`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      access_token: null,
      expiration: -1,
      refresh_token: null
    };
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
        });
      }).catch(err => {
        console.log(err);
      });
  }
  componentDidUpdate() {
    if (this.state.access_token != null) {
      // this.createIssuer();
      this.getIssuers();
      // console.log(issuers);
      // let id = issuers[0].entityId;
      // console.log(id);
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
      name: "string",
      email: "freek.de.sagher21@gmail.com",
      description: "test",
      url: "https://www.google.com"
    };
    axios.post(badgr_api + 'v2/issuers', data , { headers: { Authorization: "Bearer " + this.state.access_token } })
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
        // console.log(this.state.access_token);
      });
  }
  getIssuers(){
    console.log("fetching issuers");
    axios.get(badgr_api + 'v2/issuers', { headers: { Authorization: "Bearer " + this.state.access_token } })
      .then(res => {
        console.log(res);
        return res.data;
      }).catch(err => {
        console.log(err);
        // console.log(this.state.access_token);
      });
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
