import { handleActions } from 'redux-actions';

import { tagsLoaded, addTag } from '../actions';

const initialState = [];

const tags = handleActions(
  {
    [tagsLoaded]: (state, { payload: { data } }) => {
      return data;
    },
    [addTag]: (state, { payload: { tag } }) => {
      return [ ...state, tag ];
    },
  },
  initialState,
);

export default tags;
