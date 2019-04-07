import React, { Component } from 'react';
import { Icon, Input, Button, Row, Col } from 'antd';
import { connect } from 'react-redux';  
import axios from 'axios';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';

class AuthenticateForm extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false
            },
        },
        isSignUp: true
    }

    

    authHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
    };

    componentDidMount() {
        const flight = {
            source: 'chennai',
            destination: 'mumbai',
            start_time: '7:00',
            end_time: '8:55',
            logo: 'some string 1',
            business: {
                fare: 6650,
                seats_remaining: 1
            },
            economy: {
                fare: 2456,
                seats_remaining: 12
            },
            nonStop: true
        }

        axios.post('https://flyhighairways-2cfb4.firebaseio.com/flight.json', flight)
            .then(res => console.log(res))
            .catch(err => console.log('there was an ', err));
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => { 
            return {
                isSignUp: !prevState.isSignUp
            };    
        });
    }

    checkValidation = (value, rules) => {
        let isValid = false;

        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength 
        }

        return isValid;
    };



    inputChangedHandler = (event, inputIdentifier) => {
        
        const updatedForm = { ...this.state.authForm };
        const updatedFormElement = { ...updatedForm[inputIdentifier] }
        updatedFormElement.value = event.target.value;
        updatedForm[inputIdentifier] = updatedFormElement;
        updatedForm[inputIdentifier].valid = this.checkValidation(event.target.value, updatedForm[inputIdentifier].validation)
        this.setState({ authForm:updatedForm });
    };
    
    render() {

        const { authForm } = this.state;

        return (
            <div className={classes.BigDiv}>
                <div className={classes.LoginCard}>
                    <Row style={{height: '100%'}}>

                        <Col lg={12} className={[classes.makeHeightFull, classes.planeImg].join(' ')}>
                            
                        </Col>
                        
                        <Col lg={12} className={classes.makeHeightFull}>
                            <div className={classes.container}>

                                <h4 className={classes.FormText}>Login TO Proceed</h4>

                                <form onSubmit={(e) => this.authHandler(e)}>
                                    <Input 
                                        className={classes.InputElement} 
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                        type={authForm.email.elementConfig.type} 
                                        placeholder={authForm.email.elementConfig.placeholder} 
                                        value={authForm.email.value}
                                        onChange={(e) => this.inputChangedHandler(e, authForm.email.elementConfig.type)}
                                    />
                                    
                                    <Input
                                        className={classes.InputElement} 
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                        type="password" 
                                        placeholder="Password" 
                                        value={authForm.password.value}
                                        onChange={(e) => this.inputChangedHandler(e, authForm.password.elementConfig.type)}
                                    />

                                    <Button htmlType="submit" size="default" style={{backgroundColor: '#6A5ACD', border:'none'}} block shape="round">
                                        { this.state.isSignUp ? 'SIGN UP' : 'LOG IN' }
                                    </Button>
                                </form>
                                <Button size="small" className={classes.switchBtn} onClick={this.switchAuthModeHandler}>
                                    { this.state.isSignUp ? 'Click Here To LogIn' : 'Click Here To Sign Up' }
                                </Button>
                            </div>
                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, method) => dispatch(actions.auth(email, password, method))
    }
}

export default connect(null, mapDispatchToProps)(AuthenticateForm);