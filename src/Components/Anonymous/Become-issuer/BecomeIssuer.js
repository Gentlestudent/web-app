import React, { Component } from 'react';

// import { columns, row } from 'glamor/ous';

import Eyecatcher from './Eyecatcher';
import Info from './Info';
import StepsIssuer from './Steps';

import { Breadcrumbs } from '../../../Shared/Utils';

class BecomeIssuer extends Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Eyecatcher />
        <Breadcrumbs />
        <Info />
        <StepsIssuer />
      </div>
    )
  }
}

export default BecomeIssuer;