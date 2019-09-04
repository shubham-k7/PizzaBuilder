import React, { Component } from 'react';
import { connect } from 'react-redux'
import Layout from './hoc/Layout/Layout';
import PizzaBuilder from './containers/PizzaBuilder/PizzaBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
	componentDidMount() {
		this.props.onTrySignUp()
	}
	render() {
		let routes = (
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route path="/" exact component={PizzaBuilder} />
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route path="/orders" component={Orders} />
					<Route path="/logout" component={Logout} />
					<Route path="/auth" component={Auth} />
					<Route path="/" exact component={PizzaBuilder} />
					<Redirect to="/" />
				</Switch>
			);
		}

		return (
			<div>
				<Layout>
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.authData && state.auth.authData.token != null && state.auth.authData.userId !== null,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onTrySignUp: () => dispatch(actions.authCheckState()),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
