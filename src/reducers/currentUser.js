import { handleActions } from 'redux-actions';

import { setCurrentUser } from '../actions';

const initialState = null;

const currentUser = handleActions(
  {
    [setCurrentUser]: (state, { payload: { userId } }) => {
      return userId;
    },
  },
  initialState,
);

export default currentUser;
