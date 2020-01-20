import { COMMENTS_LOADED, ADD_COMMENT, DELETE_COMMENT,
    UPDATE_COMMENT_ADD_FILE, UPDATE_COMMENT_DELETE_FILE } from '../constants';

import { createNewIndex } from '../utils';

export const commentsLoaded = (data) => {
    return {
        type: COMMENTS_LOADED,
        payload: data
    };
};

export const addComment = (parentId, label, files, currentUser) => {
    return {
        type: ADD_COMMENT,
        payload: {
            id: createNewIndex(),
            parentId,
            dateCreated: new Date(),
            label,
            files,
            currentUser
        }
    };
};

export const deleteComment = (taskId, commentId) => {
    return {
        type: DELETE_COMMENT,
        payload: {
            taskId,
            commentId
        }
    };
};

export const updateCommentAddFile = (fileId, parentId) => {
    return {
        type: UPDATE_COMMENT_ADD_FILE,
        payload: {
            fileId,
            parentId
        }
    };
};

export const updateCommentDeleteFile = (parentId, fileId) => {
    return {
        type: UPDATE_COMMENT_DELETE_FILE,
        payload: {
            parentId,
            fileId
        }
    };
};
