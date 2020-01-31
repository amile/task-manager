import { createActions } from 'redux-actions';

import { createNewIndex } from '../utils';

export const {
  groupsLoaded,
  addGroup,
  updateGroupSetDone,
} = createActions({
  GROUPS_LOADED: (data) => ({ data }),
  ADD_GROUP: (label, parentId) => ({ label, parentId, id: createNewIndex() }),
  UPDATE_GROUP_SET_DONE: (groupId, done) => ({ groupId, done }),
});
