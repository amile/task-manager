import { COMMENTS_LOADED, ADD_COMMENT, DELETE_COMMENT,
    UPDATE_COMMENT_ADD_FILE, UPDATE_COMMENT_DELETE_FILE } from '../constants';

import { findItemInList } from '../utils';

const createNewComment = (id, parentId, label, dateCreated, currentUser) => {
    return {
        id,
        parentId,
        label,
        dateCreated,
        user: currentUser.id,
        files: []
    };
}

const updateCommentAddFile = (commentId, fileId, state) => {
    const updatedComments = findItemInList(commentId, state, 
        (comment) => {return { ...comment, files: [ ...comment.files, fileId ] }});
    return updatedComments;
}

const updateCommentDeleteFile = ({ parentId, fileId }, state) => {
    const updatedComments = findItemInList(parentId, state, 
        (comment) => {
            const idx = comment.files.findIndex((file) => file === fileId)
            return { ...comment, files: [ ...comment.files.slice(0, idx), ...comment.files.slice(idx + 1) ] }
        });
    return updatedComments;
}

const comments = (state = [], action) => {
    switch (action.type) {

        case COMMENTS_LOADED:
            return action.payload

        case ADD_COMMENT:
            const newComment = createNewComment(action.payload.id, action.payload.parentId,
                action.payload.label, action.payload.dateCreated, action.payload.currentUser);
            return [ ...state, newComment];

        case DELETE_COMMENT:
            const commentIdx = state.findIndex((comment) => comment.id === action.payload.commentId)
            return [ ...state.slice(0, commentIdx), ...state.slice(commentIdx + 1)];

        case UPDATE_COMMENT_ADD_FILE:
            return updateCommentAddFile(action.payload.parentId, action.payload.fileId, state);

        case UPDATE_COMMENT_DELETE_FILE:
            return updateCommentDeleteFile(action.payload, state);

        default:
            return state;

    }
};

export default comments;