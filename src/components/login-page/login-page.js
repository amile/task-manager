import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../../actions';

import './login-page.sass';

const LoginPage = ({ isAuth, onAuth }) => {
  if ( isAuth ) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login-wrapper">
      <button className="btn_login" onClick={onAuth}>Login</button>
    </div>               
  );

};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: bindActionCreators(loginUser, dispatch),
  };
};
export default connect(null, mapDispatchToProps)(LoginPage);