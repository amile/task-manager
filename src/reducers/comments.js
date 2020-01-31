import { handleActions } from 'redux-actions';

import {
  commentsLoaded,
  addComment,
  deleteComment,
  updateCommentAddFile,
  updateCommentDeleteFile,
} from '../actions';

import { findItemInList } from '../utils';

const createNewComment = ({ id, parentId, label, dateCreated, currentUser }) => {
  return {
    id,
    parentId,
    label,
    dateCreated,
    user: currentUser.id,
    files: [],
  };
};

const updateCommentsAddFile = ({ parentId, fileId }, state) => {
  const updatedComments = findItemInList(parentId, state,
    (comment) => {
      return {
        ...comment,
        files: [ ...comment.files, fileId ],
      };
    });
  return updatedComments;
};

const updateCommentsDeleteFile = ({ parentId, fileId }, state) => {
  const updatedComments = findItemInList(parentId, state,
    (comment) => {
      const idx = comment.files.findIndex((file) => (file === fileId));
      return {
        ...comment,
        files: [ ...comment.files.slice(0, idx), ...comment.files.slice(idx + 1) ],
      };
    });
  return updatedComments;
};

const initialState = [];

const comments = handleActions(
  {
    [commentsLoaded]: (state, { payload: { data } }) => {
      return data;
    },
    [addComment]: (state, { payload }) => {
      const newComment = createNewComment(payload);
      return [ ...state, newComment ];
    },
    [deleteComment]: (state, { payload: { commentId } }) => {
      const commentIdx = state.findIndex((comment) => (comment.id === commentId));
      return [ ...state.slice(0, commentIdx), ...state.slice(commentIdx + 1) ];
    },
    [updateCommentAddFile]: (state, { payload }) => {
      return updateCommentsAddFile(payload, state);
    },
    [updateCommentDeleteFile]: (state, { payload }) => {
      return updateCommentsDeleteFile(payload, state);
    },
  },
  initialState,
);

export default comments;
