import React from 'react';
import { Redirect } from 'react-router-dom';

import './login-page.sass';

const LoginPage = ({ isAuth, onAuth }) => {
    if ( isAuth ) {
        return <Redirect to='/' />
    }
    return (
        <button onClick={ onAuth }>Login</button>            
    );

}

export default LoginPage;