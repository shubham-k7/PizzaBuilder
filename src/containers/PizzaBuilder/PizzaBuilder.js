import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux1';
import Pizza from '../../components/Pizza/Pizza';
import BuildControls from '../../components/Pizza/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Pizza/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class PizzaBuilder extends Component {

	state = {
		purchasing: false,
	};

	componentDidMount() {
		this.props.onInitToppings();
	}

	updatePurchaseState = () => {
		if (this.props.currentToppings.length !== 0) {
			return true;
		}
		return false;
	}

	purchaseHandler = () => {
		if (this.props.isAuthenticated)
			this.setState({ purchasing: true });
		else 
			this.props.history.push("/auth");
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	};

	render() {
		const disabledInfo = this.props.currentToppings.reduce((ob, top) => ({ ...ob, [top.name]: true }), {});

		let orderSummary = null;
		let pizzaElement = this.props.error ? <p style={{ textAlign: 'center', padding: '20px' }}>Toppings cannot be loaded right now!</p> : <Spinner />

		if (this.props.availableToppings) {
			pizzaElement =
				<Aux>
					<Pizza
						crust={this.props.crust}
						toppings={this.props.currentToppings} />
					<BuildControls
						price={this.props.totalPrice}
						toppings={this.props.availableToppings}
						add={this.props.onToppingAdded}
						remove={this.props.onToppingRemoved}
						purchasable={this.updatePurchaseState()}
						disabled={disabledInfo}
						isAuthenticated={this.props.isAuthenticated}
						orderNow={this.purchaseHandler} />
				</Aux>
		}

		orderSummary = <OrderSummary
			crust={this.props.crust}
			toppings={this.props.currentToppings}
			purchaseCancel={this.purchaseCancelHandler}
			purchaseContinue={this.purchaseContinueHandler}
			price={this.props.totalPrice} />

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{pizzaElement}
			</Aux>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		currentToppings: state.pizzaBuilder.currentToppings,
		availableToppings: state.pizzaBuilder.availableToppings,
		totalPrice: state.pizzaBuilder.totalPrice,
		crust: state.pizzaBuilder.crust,
		error: state.pizzaBuilder.error,
		isAuthenticated: state.auth.authData && state.auth.authData.token !== null,
	};
}
const mapDispatchToProps = (dispatch) => {
	return {
		onToppingAdded: (name) => dispatch(actions.addToppings(name)),
		onToppingRemoved: (name) => dispatch(actions.removeToppings(name)),
		onInitToppings: () => dispatch(actions.initToppings()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PizzaBuilder, axios));