import {
  GROUPS_LOADED,
  ADD_GROUP,
  UPDATE_GROUP_SET_DONE,
} from '../constants';

import { findItemInList } from '../utils';

const updateGroupSetDone = ({groupId, done}, state) => {
  const updatedGroups = findItemInList(groupId, state,
    (group) => { return { ...group, done }; },
  );
  return updatedGroups;
};

const groups = (state = [], action) => {
  switch (action.type) {
    case GROUPS_LOADED: {
      return action.payload;
    }
    case ADD_GROUP: {
      const newGroup = {
        ...action.payload,
      };
      return [ ...state, newGroup ];
    }
    case UPDATE_GROUP_SET_DONE: {
      return updateGroupSetDone(action.payload, state);
    }
    default: {
      return state;
    }
  }
};

export default groups;
