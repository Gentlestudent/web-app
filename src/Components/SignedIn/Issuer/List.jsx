import React, { Component } from 'react';

import Spinner from '../../../Shared/Spinner';
import * as routes from '../../../routes/routes';

import { firestore } from '../../../Utils/Firebase';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

class List extends Component {

	render() {
		const { opportunities, getOpportunities } = this.props;

		return (
			<React.Fragment>
				{ !! opportunities && Object.keys(opportunities).length!==0 && <OpportunitiesList opportunities={ opportunities } getOpportunities={getOpportunities}/> }
				{ !! opportunities && Object.keys(opportunities).length===0 && <EmptyList/> }
				{ ! opportunities && <LoadingList/> }
			</React.Fragment>
		)
	}
}

class OpportunitiesList extends Component {
	constructor(props){
		super(props);

		this.state = {};
	}
	confirmDelete = (event) => {
		event.preventDefault();
		let click = event.target;
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
				<div className='confirm-delete'>
					<h1>Verwijder leerkans?</h1>
					<p>Ben je zeker dat je deze leerkans wenst te verwijderen?</p>
					<div className="content">
						<div className="content-left">
							<button onClick={() => {
								this.handleClickDelete(click);
								onClose()
							}}><b>Ja</b></button>
						</div>
						<div className="content-right">
							<button onClick={onClose}><b>Nee</b></button>
						</div>
					</div>
				</div>
				)
			}
		})
	  };
	handleClickDelete(eventTarget){
		// console.log(eventTarget.id);
		let self = this;
		firestore.softDeleteOpportunity(eventTarget.id).then((res) =>
			{self.props.getOpportunities();}
		)
		.catch(err => {
			console.log('Error soft deleting opportunity: ', err);
		});
	}
	render(){
		const { opportunities } = this.props;
		return(
			<div className="l-container">
			<ul>
				{Object.keys(opportunities).map(key =>
					<a href={`opportunities/${key}`}>
					<li className="list">
						<div className="list__opportunity_title">
							<div> <img alt="pinImage" className="pin" src={opportunities[key].pinImageUrl ? `${opportunities[key].pinImageUrl}` : null}/> </div>
							<div className="list__label list__label__title">
								{/* <div className="list__label--header"> Opportunity </div> */}
								<div className="list__label--value"><h2> {opportunities[key].title}</h2> </div>
							</div>
						</div>
						{/* <div className="filler"/> */}
						<div className="list__opportunity_data">
							<div className="list__label">
								<div className="list__label--header"> Periode </div>
								<div className="list__label--value">van {opportunities[key].beginDate}<br/>tot {opportunities[key].endDate}</div>
							</div>
							<div className="list__label">
								<div className="list__label--header"> Aantal deelnemers </div>
								<div className="list__label--value">{opportunities[key].participations}</div>
							</div>
							<div className="list__label">
								<div className="list__label--header"> Status </div>
								{!!(opportunities[key].authority===0) && <div className="list__label--value">In afwachting</div>}
								{!(opportunities[key].authority===0) && <div className="list__label--value">Geaccepteerd</div>}
							</div>
						</div>
						{/* <div className="filler"/> */}
						<div className="icon-options">
							{!!(opportunities[key].authority===0) && <a href={routes.EditOpportunity+"/"+key}><div className="edit icon-container"><i className="fas fa-edit fa-lg"></i></div></a>}
							{!(opportunities[key].authority===0) && <div className="edit icon-container"><i className="fas fa-edit fa-lg" style={{visibility:'hidden'}}></i></div>}
							<button href="#" onClick={this.confirmDelete}><div className="delete icon-container"><i className="fas fa-trash-alt fa-lg" id={key}></i></div></button>
							<a href={routes.CreateOpportunity+"/"+key}><div className="copy icon-container"><i className="fas fa-plus fa-lg"></i></div></a>
						</div>
						{/* {!!(opportunities[key].authority==0) && <a href="#"><div className="edit icon-container"><i className="fas fa-edit fa-lg"></i></div></a>}
						{!(opportunities[key].authority==0) && <div className="edit icon-container"><i className="fas fa-edit fa-lg" style={{visibility:'hidden'}}></i></div>}
						<a href="#" onClick={this.confirmDelete}><div className="delete icon-container"><i className="fas fa-trash-alt fa-lg" id={key}></i></div></a>
						<a href={routes.CreateOpportunity+"/"+key}><div className="copy icon-container"><i className="fas fa-plus fa-lg"></i></div></a> */}
					</li>
					</a>
					// <a href={`created-opportunities/${key}`} className={`card-item opportunity ${ opportunities[key].category }`} key={opportunities[key].addressId}>
					//     <img src={opportunities[key].oppImageUrl ? `${opportunities[key].oppImageUrl}` : null} className="photo" alt="" />
					//     <div style={{position: "relative"}}>
					//     <img src={`${opportunities[key].pinImageUrl}`} className="badge" alt="" />
					//     <h2>{opportunities[key].title}</h2>
					//     <div className="meta-data">
					//     <small>{opportunities[key].beginDate + ' - ' + opportunities[key].endDate}</small>
					//     {/* <small>{opportunities[key].street + ' ' + opportunities[key].house_number + ', ' + opportunities[key].postal_code + ' ' + opportunities[key].city}</small> */}
					//     </div>
					//     <p>{opportunities[key].shortDescription}</p>
					// 	<h2>Status: {(opportunities[key].authority==0) ? `In afwachting` : `Geaccepteerd`}</h2>
					//     </div>
					// </a>
				)}
			</ul>
			</div>
		)
	}
}

// const OpportunitiesList = ({ opportunities }) =>
// 	<div className="l-container">
// 	<ul>
// 		{Object.keys(opportunities).map(key =>
// 			<a href={`created-opportunities/${key}`}>
// 			<li className="list">
				
// 				<div className="list__opportunity_title">
// 					<div> <img src={opportunities[key].pinImageUrl ? `${opportunities[key].pinImageUrl}` : null}/> </div>
// 					<div className="list__label">
// 						{/* <div className="list__label--header"> Opportunity </div> */}
// 						<div className="list__label--value"><h2> {opportunities[key].title}</h2> </div>
// 					</div>
// 				</div>
// 				<div className="filler"/>
// 				<div className="list__opportunity_data">
// 					<div className="list__label">
// 						<div className="list__label--header"> Begindatum </div>
// 						<div className="list__label--value">{opportunities[key].beginDate}</div>
// 					</div>
// 					<div className="list__label">
// 						<div className="list__label--header"> Einddatum </div>
// 						<div className="list__label--value">{opportunities[key].endDate}</div>
// 					</div>
// 					<div className="list__label">
// 						<div className="list__label--header"> Aantal deelnemers </div>
// 						<div className="list__label--value">{opportunities[key].participations}</div>
// 					</div>
// 					<div className="list__label">
// 						<div className="list__label--header"> Status </div>
// 						{!!(opportunities[key].authority==0) && <div className="list__label--value">In afwachting</div>}
// 						{!(opportunities[key].authority==0) && <div className="list__label--value">Geaccepteerd</div>}
// 					</div>
// 				</div>
// 				<div className="filler"/>
// 				{!!(opportunities[key].authority==0) && <div className="edit tooltip"><a href="#"><i className="fas fa-edit fa-2x"></i></a></div>}
// 				<div className="delete tooltip"><a href="#"><i className="fas fa-trash-alt fa-2x"></i></a></div>
// 				<div className="copy tooltip"><a href={routes.CreateOpportunity+"/"+key}><i className="fas fa-plus fa-2x"></i></a></div>
// 			</li>
// 			</a>
// 			// <a href={`created-opportunities/${key}`} className={`card-item opportunity ${ opportunities[key].category }`} key={opportunities[key].addressId}>
// 			//     <img src={opportunities[key].oppImageUrl ? `${opportunities[key].oppImageUrl}` : null} className="photo" alt="" />
// 			//     <div style={{position: "relative"}}>
// 			//     <img src={`${opportunities[key].pinImageUrl}`} className="badge" alt="" />
// 			//     <h2>{opportunities[key].title}</h2>
// 			//     <div className="meta-data">
// 			//     <small>{opportunities[key].beginDate + ' - ' + opportunities[key].endDate}</small>
// 			//     {/* <small>{opportunities[key].street + ' ' + opportunities[key].house_number + ', ' + opportunities[key].postal_code + ' ' + opportunities[key].city}</small> */}
// 			//     </div>
// 			//     <p>{opportunities[key].shortDescription}</p>
// 			// 	<h2>Status: {(opportunities[key].authority==0) ? `In afwachting` : `Geaccepteerd`}</h2>
// 			//     </div>
// 			// </a>
// 		)}
// 	</ul>
// 	</div>

const EmptyList = () =>
	<div className="container">
		<p>Je hebt nog geen leerkansen aangemaakt.</p>
		<p><a href={routes.CreateOpportunity}>Klik hier </a>om een nieuwe leerkans aan te maken.</p>
	</div>

const LoadingList = () =>
	<div className="container">
		<Spinner />
	</div>

export default List;