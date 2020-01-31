import { createActions } from 'redux-actions';

import { createNewIndex } from '../utils';

export const {
  commentsLoaded,
  addComment,
  deleteComment,
  updateCommentAddFile,
  updateCommentDeleteFile,
} = createActions({
  COMMENTS_LOADED: (data) => ({ data }),
  ADD_COMMENT: (parentId, label, files, currentUser) => ({
    label,
    files,
    parentId,
    currentUser,
    id: createNewIndex(),
    dateCreated: new Date(),
  }),
  DELETE_COMMENT: (taskId, commentId) => ({ taskId, commentId }),
  UPDATE_COMMENT_ADD_FILE: (fileId, parentId) => ({ fileId, parentId }),
  UPDATE_COMMENT_DELETE_FILE: (parentId, fileId) => ({ fileId, parentId }),
});
