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
                    {/* <Route
                        path='/'
                    /> */}
                    <Route
                        path='/group/:groupId/'
                        render={ ({ match, history }) => {
                            const { groupId } = match.params;
                            return (
                                <MainPage groupId={ groupId } history={ history } match={ match }/>
                            )
                        }}
                    />
                        <Route
                            path='/group/:groupId/task/:taskId/:parentId?'
                            render={ ({ match, history }) => {
                                const { taskId, parentId } = match.params;
                                return (
                                    <TaskForm itemId={ taskId } groupId={ parentId } history={ history } match={ match }/>
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