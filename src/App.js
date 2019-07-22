import React, { Component } from 'react';

import { Provider } from 'react-redux';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";

import store from './store';

import FrontPage from './Components/Anonymous/Frontpage/FrontPage';
import Opportunities from './Components/SignedIn/Opportunities/Opportunities';
import BecomeIssuer from './Components/Anonymous/Become-issuer/BecomeIssuer';
import Experiences from './Components/Anonymous/Experiences/Experiences';
import News from './Components/Anonymous/News/News';
import AboutUs from './Components/Anonymous/AboutUs';
import Register from './Components/Anonymous/Auth/Register';
import Login from './Components/Anonymous/Auth/Login';
import ResetPassword from './Components/Anonymous/Auth/ResetPassword';
import Quests from './Components/Quests/Quests';
import CreateQuest from './Components/Quests/Giver/CreateQuest'
import EditQuest from './Components/Quests/Giver/EditQuest'

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
import MyOpportunities from './Components/SignedIn/Opportunities/MyOpportunities';

import Navigation from './Shared/Navigation';
import Footer from './Shared/Footer';

import withAuthentication from './Shared/withAuthentication';
import withBadgr from './Shared/withBadgr';
import withQuest from './Shared/withQuest';

import * as routes from './routes/routes';
import AuthUserContext from './Shared/AuthUserContext';
import Spinner from './Shared/Spinner';

const PrivateRoute = ({ component: Component, needAuth, ...rest }) => (
	<Route {...rest} render={(props) => (
		<AuthUserContext.Consumer>
			{authUser => (authUser && needAuth) || (!authUser && !needAuth)
				? <Component {...props} />
				: <Redirect to={routes.FrontPage} />
			}
		</AuthUserContext.Consumer>
	)} />
)

const LoadingScreen = () => <div> <Spinner /> </div>

class App extends Component {

	constructor(props) {
		super(props);
		this.state = { loading: true, called: false }
	}

	componentDidUpdate() {
		if (this.state.called === false) {
			this.setState({ loading: false, called: true })
		}
	}

	render() {
		const { loading } = this.state;
		return (
			<React.Fragment>
				{loading && <LoadingScreen />}
				{!loading && <Provider store={store}>
					<Router>
						<div>
							<Navigation />
							<div className="main-content">
								<Switch>
									<Route path={routes.FrontPage} exact render={() => <FrontPage />} />
									<Route path={routes.Opportunities} render={() => <Opportunities />} />
									<Route path={routes.Quests} render={() => <Quests/>} />
									<Route path={routes.BecomeIssuer} exact render={() => <BecomeIssuer />} />
									<Route path={routes.Experiences} render={() => <Experiences />} />
									<Route path={routes.News} render={() => <News />} />
									<Route path={routes.AboutUs} exact render={() => <AboutUs />} />
									<PrivateRoute path={routes.Register} component={Register} needAuth={false} /*render={() => <Register />}*/ />
									<PrivateRoute path={routes.Login} component={Login} needAuth={false} /*render={() => <Login />}*/ />
									<PrivateRoute path={routes.ResetPassword} component={ResetPassword} needAuth={false} /*render={ () => <ResetPassword />}*/ />
									{/* <Route path="/login" render={() => <Login />} /> */}
									{/* BACKOFFICE */}
									{/* <Auth> */}
									<PrivateRoute path={routes.CreateQuest} component={CreateQuest} needAuth={true} />
									<PrivateRoute path={routes.BOOpportunities} component={BOOpportunities} needAuth={true} /*exact render={() => <BOOpportunities />}*/ />
									<PrivateRoute path={routes.CreateOpportunity} component={CreateOpportunity} needAuth={true} /*exact render={() => <CreateOpportunity />}*/ />
									<Route path={routes.CreateOpportunity + '/:id'} exact render={({ match }) => <CreateOpportunity match={match} />} />
									<PrivateRoute path={routes.IssueBadgeRecipient} component={IssueBadgeRecipient} needAuth={true} /*exact render={() => <IssueBadgeRecipient />}*/ />
									<PrivateRoute path={routes.RegisterIssuer} needAuth={true} component={RegisterIssuer} /*exact render={() => <RegisterIssuer />}*/ />
									<PrivateRoute path={routes.ValidateIssuer} component={ValidateIssuer} needAuth={true} /*exact render={() => <ValidateIssuer />}*/ />
									<PrivateRoute path={routes.ValidateOpportunity} component={ValidateOpportunity} needAuth={true} /*exact render={() => <ValidateOpportunity />}*/ />
									<PrivateRoute path={routes.CreatedOpportunities} component={CreatedOpportunities} needAuth={true} /*render={() => <CreatedOpportunities />}*/ />
									<PrivateRoute path={routes.EditOpportunity + '/:id'} component={EditOpportunity} needAuth={true} /*render={() => <EditOpportunity />}*/ />
									<PrivateRoute path={routes.Profile} component={Profile} needAuth={true} /*exact render={() => <Profile />}*/ />
									<PrivateRoute path={routes.EditQuest + "/:id"} component={EditQuest} needAuth={true} />
									<Route path={routes.Backpack} exact render={() => <Backpack />} />
									<Route path={routes.MyOpportunities} exact render={() => <MyOpportunities />} />
									<Route path={routes.Privacy} exact render={() => <Privacy />} />
									<Route path={routes.Conditions} exact render={() => <Conditions />} />
									<Route path="*" render={() => <NoMatch />} />
									{/* </Auth> */}
								</Switch>
							</div>
							<Footer />
						</div>
					</Router>
				</Provider>}
			</React.Fragment>
		);
	}
}


export default withBadgr(withAuthentication(withQuest(App)));