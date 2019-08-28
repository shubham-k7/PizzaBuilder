import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

	state = {
		showSideDrawer: false,
	};

	sideDrawerCloseHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState( (prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer }
		});
	};

	render() {
		return (
			<React.Fragment>
				<SideDrawer 
					closed={this.sideDrawerCloseHandler}
					open={this.state.showSideDrawer} />
				<Toolbar 
					isAuth={this.props.isAuthenticated}
					drawerToggledClicked={this.sideDrawerToggleHandler} />
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.authData && state.auth.authData.tokenId !== null
	}
}

export default connect(mapStateToProps)(Layout);