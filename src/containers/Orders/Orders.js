import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from './Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount = () => {
        this.props.fetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order
                    key={order.id}
                    toppings={order.toppings}
                    crust={order.crust}
                    price={order.price}
                    id={order.id} />
            })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        token: state.auth.authData.tokenId,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));