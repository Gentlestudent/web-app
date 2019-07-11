import React, { Component } from 'react';
import { firestore } from '../../../Utils/Firebase';

import * as routes from '../../../routes/routes.js';


class Opportunities extends Component {
	constructor(props) {
		super(props);

		this.state = {
			opportunities: null
		};
	}
	componentDidMount() {
		firestore.onceGetLatestOpportunities().then(snapshot => {
			let res = {};
			snapshot.forEach(doc => {
				res[doc.id] = doc.data();
			});
			this.setState(() => ({ opportunities: res }))
			// console.log(this.state.opportunities);
		})
			.catch(err => {
				console.log('Could not fetch opportunity data: ', err);
			});
	}
	renderOpportunity(id, img, badge, type, title, synopsis, startDate, endDate) {
		return (
			<a href={`${routes.Opportunities}/${id}`} className={`card-item opportunity ${type}`}>
				<img src={img} className="photo" alt="photoo" />
				<div style={{ position: "relative" }}>
					<img src={badge} className="badge" alt="badge" />
					<h2>{title}</h2>
					<div className="meta-data">
						<small>{startDate + ' - ' + endDate}</small>
						{/* <small>{address}</small> */}
					</div>
					<p>{synopsis}</p>
				</div>
			</a>
		)
	}
	render() {
		const { opportunities } = this.state;
		return (
			<div id="opportunities">
				<div className="container">
					<div className="content">
						<h1 className="uitgelicht">Leerkansen</h1>
						{!!opportunities &&
							<div className="card-container">
								{Object.keys(opportunities).map(key =>
									<a key={key} href={`${routes.Opportunities}/${key}`} className={`card-item opportunity ${opportunities[key].category}`}>
										<div className="crop-opp-img">
											<img src={opportunities[key].oppImageUrl} className="photo" alt="photoo" />
										</div>
										<div style={{ position: "relative" }}>
											<img src={opportunities[key].pinImageUrl} className="badge" alt="badge" />
											<h2>{opportunities[key].title}</h2>
											<div className="meta-data">
												<small>{opportunities[key].beginDate + ' tot ' + opportunities[key].endDate}</small>
												{/* <small>{address}</small> */}
											</div>
											<p>{opportunities[key].shortDescription}</p>
										</div>
									</a>
								)}
							</div>
						}
						<a className="meer" href="/opportunities">Meer leerkansen</a>
					</div>
				</div>
			</div>
		)
	}
}


export default Opportunities;