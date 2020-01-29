import { createSelector } from 'reselect';

import { usersSelector } from './users';
import { getAllFilesSelector } from './files';

export const getAllCommentsSelector = createSelector(
  state => state.comments,
  items => items,
);

export const commentUserId = (_, props) => props.comment.user;

export const makeCommentCreatedByUserSelector = () => {
  return createSelector(
    commentUserId,
    usersSelector,
    (userId, users) => users.find((user) => (user.id === userId)),
  );
};

export const commentFilesId = (_, props) => props.comment.files;

export const makeCommentFilesSelector = () => {
  return createSelector(
    commentFilesId,
    getAllFilesSelector,
    (commentFilesId, files) => (commentFilesId.length > 0)
      ? commentFilesId.map(
        (id) => files.find((file) => (id === file.id)),
      )
      : null,
  );
};
