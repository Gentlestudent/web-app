import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { firestore } from '../../../Utils/Firebase';

import Detail from './Detail';
import List from './List';

class News extends Component {
    constructor(props) {
		super(props);
	
		this.state = {
		  newsItems: null
		};
	  }
	componentDidMount() {
		window.scrollTo(0, 0);
		firestore.onceGetNewsItems().then(snapshot => {
			let res = {};
			snapshot.forEach(doc => {
				res[doc.id] = doc.data();
			});
            this.setState(() => ({ newsItems: res }))
            // console.log(this.state.newsItems);
		})
		.catch(err => {
			console.log('Error getting documents', err);
		});
	}
	render() {
		const { newsItems } = this.state;

		return (
            <Switch>
				<Route path={'/news/:id'} render={({match}) => <Detail newsItems={newsItems}  match={match}/>} />
				<Route path={'/news'} render={() => 
					<div className="news-items-content">
						<div className="container">
							<div className="content content-with-padding">
								<h1>Nieuws</h1>
								<div id="nieuws">
									<List newsItems={newsItems} />
								</div>
							</div>
						</div>
                    </div>
				} />
			</Switch>
        )
    }
}

export default News;