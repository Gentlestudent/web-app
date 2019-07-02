import React, { Component } from 'react';

import { eyecatcherWrapper, section } from './Styles';

import Image from '../../../assets/become-issuer.jpg';

class Eyecatcher extends Component {
  constructor(props){
    super(props);

    this.state = {eyecatcherwidth:0}

    this.updateDimensions = this.updateDimensions.bind(this);
    this.initialize = this.initialize.bind(this);
  }
  componentDidMount(){
    this.initialize();
    this.updateDimensions();
    window.addEventListener('load', this.initialize);
    window.addEventListener('load', this.updateDimensions);
    window.addEventListener("resize", this.updateDimensions);
  }
  initialize(){
    if(document.getElementById('eyecatcherwrapper')){
      this.setState({eyecatcherwidth: document.getElementById('eyecatcherwrapper').getElementsByTagName('img')[0].offsetWidth});
    }
    // console.log(this.state.eyecatcherwidth);
  }
  updateDimensions(){
    var eyecatcher = document.getElementById('eyecatcherwrapper');
    // console.log(window.innerWidth);
    if(eyecatcher && this.state.eyecatcherwidth<=window.innerWidth){
      eyecatcher.getElementsByTagName('img')[0].style["height"] = "auto";
      eyecatcher.getElementsByTagName('img')[0].style["width"] = "100%";
    }
    else{
      eyecatcher.getElementsByTagName('img')[0].style["height"] = "100%";
      eyecatcher.getElementsByTagName('img')[0].style["width"] = "auto";
    }
  }
	render() {
		return (
      <React.Fragment>
        <div id="become-issuer" {...section}>
          <div id="eyecatcherwrapper" {...eyecatcherWrapper}>
            <img src={Image} alt="eyecatcher-become-issuer" className="eyecatcher-become-issuer" />
          </div>
          <div className="container">
            <div className="content">
              <h1>Word vandaag nog een issuer!</h1>
            </div>
          </div>
        </div>
      </React.Fragment>
		)
	}
}

export default Eyecatcher;