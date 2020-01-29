import { TAGS_LOADED, ADD_TAG } from '../constants';

const tags = (state = [], action) => {
  switch (action.type) {

  case TAGS_LOADED:
    return action.payload;

  case ADD_TAG:
    return [ ...state, action.payload.tag];

  default:
    return state;
  }
};

export default tags;