import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter, Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import * as actions from '../../store/actions/index';
class Checkout extends Component {
    // { id: '1', name: 'pepperoni', label: 'Pepperoni', isVeg: false, quantity: 3, price: 50 },
    // { id: '2', name: 'olive', label: 'Olive', isVeg: true, quantity: 3, price: 30 },
    // { id: '3', name: 'mushroom', label: 'Mushroom', isVeg: true, quantity: 3, price: 35 },
    // { id: '4', name: 'chicken', label: 'Chicken', isVeg: false, quantity: 3, price: 80 },

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.push({
            pathname: '/checkout/contact-data',
        });
    }

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.toppings && this.props.toppings.length != 0) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary =
                <div>
                    {purchasedRedirect}
                    < CheckoutSummary
                        toppings={this.props.toppings}
                        crust={this.props.crust}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued} />
                </div>
        }
        return (
            <div>
                {summary}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        toppings: state.pizzaBuilder.currentToppings,
        crust: state.pizzaBuilder.crust,
        purchased: state.order.purchased,
    };
};

export default connect(mapStateToProps)(withRouter(Checkout));