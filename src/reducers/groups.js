import { handleActions } from 'redux-actions';

import {
  groupsLoaded,
  addGroup,
  updateGroupSetDone,
} from '../actions';

import { findItemInList } from '../utils';

const updateGroupDone = ({ groupId, done }, state) => {
  const updatedGroups = findItemInList(groupId, state,
    (group) => { return { ...group, done }; },
  );
  return updatedGroups;
};

const initialState = [];

const groups = handleActions(
  {
    [groupsLoaded]: (state, { payload: { data } }) => {
      return data;
    },
    [addGroup]: (state, { payload }) => {
      const newGroup = { ...payload };
      return [ ...state, newGroup ];
    },
    [updateGroupSetDone]: (state, { payload }) => {
      return updateGroupDone(payload, state);;
    },
  },
  initialState,
);

export default groups;
