import React, {Fragment} from 'react';
import { CometChat } from "@cometchat-pro/chat";
import {API_ID, API_KEY} from '../../config/config';
import Spinner from '../../components/Spinner/Spinner';
import { Redirect } from "react-router-dom";
import './Login.css';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {userName: "", error:"", isLoading: false, redirectState: false};
    }

    inputChangeHandler = (event) => {
        this.setState({userName: event.target.value.toUpperCase() });
    }

    loginHandler = () => {
        CometChat.login(this.state.userName, API_KEY).then(
            User => {
              console.log("Login Successful:", User);
              //this.setState({ redirectState: true });
              this.redirectHandler();
            },
            error => {
              console.log("Login failed with exception:", { error });
              this.setState({
                error: "Login failed, please enter a valid username",
                isLoading: false
              });
            }
          );
    }

    submitHandler = e =>{
        console.log('login handler');
        e.preventDefault();
        this.loginHandler();
        this.setState({ isLoading: true, error: "" });
    }
    redirectHandler = () => {
        //return <Redirect to= '/dashboard' />
        this.props.history.push('/dashboard');
    }

    render(){
        return(
            <Fragment>
                <div className='login'>
                    <h4>Welcome to you React Chat App</h4>
                    {/* {!this.state.redirectState ? "" : this.redirectHandler() } */}
                    <div className='form'>
                        <form onSubmit={this.submitHandler}>
                            <div>
                            <input 
                                type ='text' 
                                placeholder='enter your Name'
                                onChange = {this.inputChangeHandler}
                                value={this.state.userName}
                            />
                            </div>
                            <button className='loginBtn'>Login</button>
                        </form>
                    </div>
                    <div className="error">{this.state.error}</div>
                    <div className='signup-text'>
                        <p>Need an account?</p>
                        <p>
                            create one from {" "}
                            <a href="https://app.CometChat.com/" target="blank">Comet Chat Pro</a>
                        </p>
                        <p>or use one of our test user names: superhero1, superhero2, superhero3 to login</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login;
