import { USERS_LOADED, LOGIN_USER, SET_CURRENT_USER } from '../constants';

export const usersLoaded = (data) => {
    return {
        type: USERS_LOADED,
        payload: data
    };
};

export const loginUser = (login, pass) => {
    return {
        type: LOGIN_USER,
        payload: { 
           login,
           pass 
        }
    };
};

export const setCurrentUser = (userId) => {
    return {
        type: SET_CURRENT_USER,
        payload: userId
    };
};
