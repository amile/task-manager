import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import optimize from '../../styles/styles';
import './app.sass';

import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import MenuLeft from '../menu-left/menu-left';


class App extends Component {
    constructor() {
        super();
        this.state = {
            isAuth: false
        };
        this.onAuth = () => {
            this.setState({ isAuth: true });
        };
    };
    render() {
        return (
            <div className='app'>
                <MenuLeft />
                <Switch>
                    <Route
                        path='/'
                        component={ MainPage }
                        exact />
                    <Route
                        path='/login'
                        render={ () => {
                            return (
                                <LoginPage isAuth={ this.state.isAuth } onAuth={ this.onAuth } />
                            )
                        }} />
                </Switch>
            </div>            
        );
    };
}

export default App;