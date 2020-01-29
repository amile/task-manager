import {
  GROUPS_LOADED,
  ADD_GROUP,
  UPDATE_GROUP_SET_DONE,
} from '../constants';

import { createNewIndex } from '../utils';

export const groupsLoaded = (data) => {
  return {
    type: GROUPS_LOADED,
    payload: data,
  };
};

export const addGroup = (label, parentId) => {
  return {
    type: ADD_GROUP,
    payload: {
      parentId,
      label,
      id: createNewIndex(),
    },
  };
};

export const updateGroupSetDone = (groupId, done) => {
  return {
    type: UPDATE_GROUP_SET_DONE,
    payload: {
      groupId,
      done,
    },
  };
};
