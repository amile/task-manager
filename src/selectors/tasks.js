import { createSelector } from 'reselect';

import { usersSelector } from './users';
import { getAllTagsSelector } from './tags';
import { getAllCommentsSelector } from './comments';

export const tasksSelector = createSelector(
  state => state.tasks,
  items => items
);

export const showedTaskId = (_, props) => props.itemId;

export const showedTaskSelector = createSelector(
  tasksSelector,
  showedTaskId,
  (tasks, showedTaskId) => tasks.find(task => task.id === showedTaskId)
);

export const taskCreatedByUserIdSelector = createSelector(
  showedTaskSelector,
  (item) => (item) ? item.user : null,
);

export const taskCreatedByUserSelector = createSelector(
  taskCreatedByUserIdSelector,
  usersSelector,
  (userId, users) => users.find((user) => user.id === userId)
);

export const taskAssignedUsersIdSelector = createSelector(
  showedTaskSelector,
  (item) => (item) ? item.assigned : [],
);

export const makeTaskAssignedUsersSelector = () => {
  return createSelector(
    taskAssignedUsersIdSelector,
    usersSelector,
    (assigned, users) => (assigned.length > 0) ? assigned.map(
      (item) => users.find((user) => item === user.id)
    ) : null
  );
};

export const getTaskTagsId = (_, props) => props.task.tags;

export const makeTaskTagsSelector = () => {
  return createSelector(
    getTaskTagsId,
    getAllTagsSelector,
    (tagsIdList, tags) => (tagsIdList.length > 0) ? tagsIdList.map(
      (id) => tags.find((tag) => id === tag.id)
    ) : null
  );
};

export const getTaskCommentsId = (_, props) => props.task.comments;

export const makeTaskCommentsSelector = () => {
  return createSelector(
    getTaskCommentsId,
    getAllCommentsSelector,
    (commentsIdList, comments) => (commentsIdList.length > 0) ? commentsIdList.map(
      (id) => comments.find((comment) => id === comment.id)
    ) : null
  );
};

/* export const taskCommentsFilesId = createSelector(
    getTaskCommentsSelector,
    items => (!items) ? [] : items.map(item => item.files)
); */
/* 

export const getAllTaskFilesSelector = createSelector(
    taskCommentsFilesId,
    getAllFilesSelector,
    (taskFilesId, files) => (taskFilesId.length > 0) ? taskFilesId.map(
        (id) => files.find((file) => id === file.id)
    ) : null
); */
