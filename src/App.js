import React, { Component } from 'react';

import { Provider } from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";

import store from './store';

import { firebase } from './Utils/Firebase';

import FrontPage from './Components/Anonymous/Frontpage/FrontPage';
import Opportunities from './Components/SignedIn/Opportunities/Opportunities';
import BecomeIssuer from './Components/Anonymous/Become-issuer/BecomeIssuer';
import Experiences from './Components/Anonymous/Experiences/Experiences';
import News from './Components/Anonymous/News/News';
import AboutUs from './Components/Anonymous/AboutUs';
import Register from './Components/Anonymous/Auth/Register';
import Login from './Components/Anonymous/Auth/Login';
import ResetPassword from './Components/Anonymous/Auth/ResetPassword';

import BOOpportunities from './Components/SignedIn/Backoffice/Opportunities';
import CreateOpportunity from './Components/SignedIn/Issuer/CreateOpportunity';
import IssueBadgeRecipient from './Components/SignedIn/Issuer/IssueBadgeRecipient';
import RegisterIssuer from './Components/Anonymous/Auth/RegisterIssuer';
import ValidateIssuer from './Components/SignedIn/Admin/ValidateIssuer';
import ValidateOpportunity from './Components/SignedIn/Admin/ValidateOpportunity';
import CreatedOpportunities from './Components/SignedIn/Issuer/CreatedOpportunities';
import EditOpportunity from './Components/SignedIn/Issuer/EditOpportunity';
import Profile from './Components/SignedIn/Backoffice/Profile';
import Privacy from './Components/Anonymous/Privacy';
import Conditions from './Components/Anonymous/Conditions';
import NoMatch from './Shared/NoMatch';
import Backpack from './Components/SignedIn/Backoffice/Backpack';

import Navigation from './Shared/Navigation';
import Footer from './Shared/Footer';

import withAuthentication from './Shared/withAuthentication';
import withBadgr from './Shared/withBadgr';

import * as routes from './routes/routes';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Navigation/>
						<div class="main-content">
						<Switch>
								<Route path={routes.FrontPage} exact render={() => <FrontPage />} />
								<Route path={routes.Opportunities} render={() => <Opportunities />} />
								<Route path={routes.BecomeIssuer} exact render={() => <BecomeIssuer />} />
								<Route path={routes.Experiences} render={() => <Experiences />} />
								<Route path={routes.News} render={() => <News />} />
								<Route path={routes.AboutUs} exact render={() => <AboutUs />} />
								<Route path={routes.Register} render={() => <Register />} />
								<Route path={routes.Login} render={() => <Login />} />
								<Route path={routes.ResetPassword} render={ () => <ResetPassword />} />
								{/* <Route path="/login" render={() => <Login />} /> */}
								{/* BACKOFFICE */}
								{/* <Auth> */}
								<Route path={routes.BOOpportunities} exact render={() => <BOOpportunities />} />
								<Route path={routes.CreateOpportunity} exact render={() => <CreateOpportunity />} />
								<Route path={routes.CreateOpportunity+'/:id'} exact render={({match}) => <CreateOpportunity match={match}/>} />
								<Route path={routes.IssueBadgeRecipient} exact render={() => <IssueBadgeRecipient />} />
								<Route path={routes.RegisterIssuer} exact render={() => <RegisterIssuer />} />
								<Route path={routes.ValidateIssuer} exact render={() => <ValidateIssuer />} />
								<Route path={routes.ValidateOpportunity} exact render={() => <ValidateOpportunity />} />
								<Route path={routes.CreatedOpportunities} render={() => <CreatedOpportunities />} />
								<Route path={routes.EditOpportunity+'/:id'} render={() => <EditOpportunity />} />
								<Route path={routes.Profile} exact render={() => <Profile />} />
								<Route path={routes.Backpack} exact render={() => <Backpack />} />
								<Route path={routes.Privacy} exact render={() => <Privacy />} />
								<Route path={routes.Conditions} exact render={() => <Conditions />} />
								<Route path="*" render={() => <NoMatch />} />
								{/* </Auth> */}
						</Switch>
						</div>
						<Footer/>
					</div>
				</Router>
			</Provider>
		);
	}
}


export default withBadgr(withAuthentication(App));