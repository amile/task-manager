import { createSelector } from 'reselect';

import { tasksSelector } from './tasks';

export const groupsSelector = createSelector(
  state => state.groups,
  items => items
);

export const getGroupId = (_, props) => props.groupId;

export const showedGroupSelector = createSelector(
  getGroupId,
  groupsSelector,
  (groupId, groups) => groups.find( (group) => group.id === groupId )
);

export const parentGroupId = (_, props) => props.group.id;

export const makeInnerGroupsSelector = () => {
  return createSelector (
    groupsSelector,
    parentGroupId,
    (groups, parentId) => groups.filter( (group) => group.parentId === parentId )
  );
};

export const makeInnerTasksSelector = () => {
  return createSelector(
    tasksSelector,
    parentGroupId,
    (tasks, parentId) => tasks.filter((task) => task.parentId === parentId)
  );
};
