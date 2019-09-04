import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', label: 'Fastest' },
                        { value: 'cheapest', label: 'Cheapest' },
                    ]
                },
                value: 'fastest',
            }
        },
        loading: false,
        purchased: false,
    };

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {}

        for (let formElIdentifier in this.state.orderForm) {
            formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
        }
        
        const order = {
            toppings: this.props.toppings,
            crust: this.props.crust,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
        };
        this.props.onPurchaseStart(order, this.props.token);

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const formData = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...formData[inputIdentifier],
        }
        updatedFormElement.value = event.target.value;
        formData[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: formData });
    }

    render() {
        const formElArr = [];
        for (let key in this.state.orderForm) {
            formElArr.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (
            <form>
                {formElArr.map(formEl => {
                    return (<Input
                        key={formEl.id}
                        elementType={formEl.config.elementType}
                        elementConfig={formEl.config.elementConfig}
                        value={formEl.config.value}
                        changed={(event) => this.inputChangedHandler(event, formEl.id)} />);
                })}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h3>Enter your Contact details</h3>
                {form}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        toppings: state.pizzaBuilder.currentToppings,
        crust: state.pizzaBuilder.crust,
        price: state.pizzaBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.authData.tokenId,
        userId: state.auth.authData.userId,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchaseStart: (orderData) => dispatch(orderActions.purchaseBurger(orderData)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));