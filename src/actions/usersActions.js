import { createAction, createActions } from 'redux-actions';

export const {
  usersLoaded,
  loginUser,
  setCurrentUser,
} = createActions({
  USERS_LOADED: (data) => ({ data }),
  LOGIN_USER: (login, pass) => ({ login, pass }),
  SET_CURRENT_USER: (userId) => ({ userId }),
});
