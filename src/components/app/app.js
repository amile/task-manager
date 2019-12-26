import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import '../../styles/styles';
import './app.sass';

import ItemList from '../item-list/item-list';
import LoginPage from '../login-page/login-page';
import TopBar from '../top-bar/top-bar';
import MainPage from '../main-page/main-page';


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
                <TopBar />
                <div className='app-wrapper'>
                    <Switch>
                        <Route exact path='/' render={ () => {
                            return (<Redirect to='app' />);
                        }} />
                        <Route path='/app' component={ MainPage }/>
                        <Route
                            path='/login'
                            render={ () => {
                                return (
                                    <LoginPage isAuth={ this.state.isAuth } onAuth={ this.onAuth } />
                                );
                            }} 
                        />
                        <Route render={ () => {
                            return (<h1>Page not found</h1>);
                        }} />
                    </Switch>
                </div>
            </div>            
        );
    };
}

export default App;