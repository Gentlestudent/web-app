import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import OSM from './OSM'

import { firestore } from '../../../Utils/Firebase';

import Maps from './Maps';
import SearchFilter from './SearchFilters';

import Detail from './Detail';
import List from './List';

class Opportunities extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
		  opportunities: null,
		  initialOpportunities: null,
		  addresses: null,
		  issuers: null
		};
		this.filterOpportunities = this.filterOpportunities.bind(this);
	  }
	componentDidMount() {
		window.scrollTo(0, 0);
		firestore.onceGetValidatedOpportunities().then(snapshot => {
			let res = {};
			snapshot.forEach(doc => {
				res[doc.id] = doc.data();
				res[doc.id]["id"] = doc.id;
			});
			this.setState(() => ({ opportunities: res }))
			this.setState(() => ({ initialOpportunities: res }))
		})
		.catch(err => {
			console.log('Error getting documents', err);
		});
		firestore.onceGetAddresses().then(snapshot => {
			let res = {};
			snapshot.forEach(doc => {
				res[doc.id] = doc.data();
			});
			this.setState(() => ({ addresses: res }));
			// console.log(this.state.addresses);
		})
		.catch(err => {
			console.log('Error getting documents', err);
		});
		firestore.onceGetValidatedIssuers().then(snapshot => {
			let res = {};
			snapshot.forEach(doc => {
				res[doc.id] = doc.data();
				res[doc.id]['id'] = doc.id;
			});
			this.setState(() => ({ issuers: res }))
		})
		.catch(err => {
			console.log('Error getting documents', err);
		});
	}
	filterOpportunities(event){
		event.preventDefault();
		let initialList = this.state.initialOpportunities;
		let filteredArray = Object.keys(initialList).map(function(key) {
			return [key, initialList[key]];
		  });
		// console.log(filteredArray);
		filteredArray = filteredArray.filter(function(item){
			let content = "";
			// eslint-disable-next-line
			Object.keys(item[1]).map(function(key) {
				// console.log(key);
				content += item[1][key];
			});
			// console.log(content);
			return content.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		});
		// console.log(filteredArray);
		let updatedList = {};
		filteredArray.forEach((item, index)=>{
			let key = item[0];
			updatedList[key] = item[1];
		});
		// console.log(updatedList);
		this.setState({opportunities: updatedList});
	  }
	render() {
		const { opportunities, addresses, issuers } = this.state;

		return (
			<Switch>
				<Route path={'/opportunities/:id'} render={({match}) => <Detail opportunities={opportunities}  match={match}/>} />
				<Route path={'/opportunities'} render={() => 
					<div className="opportunities-content">
						<div className="content">
							<SearchFilter filterFunction={this.filterOpportunities} />
							<div id="opportunities">
								<div className="content-left">
									<List opportunities={opportunities} />
								</div>
								<div className="content-right">
									<div className="content map-container" id="stickybox">
										{!!opportunities && !!addresses && !!issuers && <OSM opportunities={opportunities} addresses={addresses} issuers={issuers}/>}
									</div>
								</div>
							</div>
						</div>
					</div>
				} />
			</Switch>
		)
	}
}

export default Opportunities;