import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BOOpportunities extends Component {
  constructor(props) {
    super(props)

    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
	  // this.props.fetchOpportunities();
	}
  delete(id) {
    // this.props.deleteOpportunity(id);
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="content">
            <h1>Manage Leerkansen</h1>
            <button><Link to="/backoffice/create-opportunities"> + Create leerkans</Link></button><hr />
            {
              this.props.opportunities.items.map((lk, key) => {
                return(
                  <div key={key}>
                    <p>
                      {lk.title}
                    </p>
                    <button onClick={() => this.delete(lk._id)}>Delete</button><hr />
                  </div>
                )
              })
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default BOOpportunities;