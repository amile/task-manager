import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import '../../styles/styles';
import './app.sass';

import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import MenuLeft from '../menu-left/menu-left';
import TaskForm from '../task-form/task-form';
import TopBar from '../top-bar/top-bar';


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
                    <MenuLeft />
                    <Route
                        path='/'
                        component={ MainPage }
                    />
                    <Route
                        path='/task/:id/:group?'
                        render={ ({ match }) => {
                            const { id, group } = match.params;
                            return (
                                <TaskForm itemId={ id } groupId={ group }/>
                            )
                        }}
                    />
                    <Route
                        path='/login'
                        render={ () => {
                            return (
                                <LoginPage isAuth={ this.state.isAuth } onAuth={ this.onAuth } />
                            )
                        }} 
                    />

                </div>
            </div>            
        );
    };
}

export default App;