import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { currentUserID } from '../../selectors';

import '../../styles/styles';
import './app.sass';

import LoginPage from '../login-page/login-page';
import TopBar from '../top-bar/top-bar';
import MainPage from '../main-page/main-page';


class App extends Component {
    render() {
        return (
            <div className='app'>
                <TopBar />
                <div className='app-wrapper'>
                    <Switch>
                        <Route exact path='/' render={ () => {
                            if (this.props.isAuth) {
                                return (<Redirect to='/app' />);
                            } else {
                                return (<Redirect to='/login' />);
                            }
                        }} />
                        <Route path='/app' component={ MainPage }/>
                        <Route
                            path='/login'
                            render={ () => {
                                return (
                                    <LoginPage isAuth={ this.props.isAuth } />
                                );
                            }} 
                        />
                        <Route render={ () => {
                            return (<h1 className='title_not-found'>Page not found</h1>);
                        }} />
                    </Switch>
                </div>
            </div>            
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isAuth: currentUserID(state)
    }
}

export default connect(mapStateToProps)(App);