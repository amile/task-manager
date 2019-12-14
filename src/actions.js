import { STATE_LOADED, ADD_PROJECT, ADD_GROUP, ADD_TASK, ADD_TAG, SET_SHOWED_GROUP,
    UPDATE_TASK_ADD_TAG, UPDATE_TASK_DELETE_TAG, UPDATE_TASK_CHANGE_STATUS,
    UPDATE_TASK_ADD_ASSIGNED, UPDATE_TASK_ADD_COMMENT, ADD_FILE, UPDATE_TASK_ADD_FILE,
    UPDATE_COMMENT_ADD_FILE } from './constants';

import { createNewIndex, genFileHash } from './utils';

const projectLoaded = (data) => {
    return {
        type: STATE_LOADED,
        payload: data
    };
};

const addProject = (label) => {
    return {
        type: ADD_PROJECT,
        payload: {
            id: createNewIndex(),
            label
        }
    };
};

const addGroup = (label, parentId) => {
    return {
        type: ADD_GROUP,
        payload: {
            id: createNewIndex(),
            parentId, 
            label
        }
    };
};

const addTask = (label, parentId, history) => {
    return {
        type: ADD_TASK,
        history,
        payload: {
            id: createNewIndex(), 
            label, 
            parentId, 
            dateCreated: new Date()
        }
    };
};

const setShowedGroup = (parentId) => {
    return {
        type: SET_SHOWED_GROUP,
        payload: { parentId }
    };
}

const addTag = (id, tag) => {
    return {
        type: ADD_TAG,
        payload: {
            id,
            tag: { ...tag, id: createNewIndex()}
        }
    };
}

const updateTaskAddTag = (taskId, tagId) => {
    return {
        type: UPDATE_TASK_ADD_TAG,
        payload: {
            taskId,
            tagId
        }
    };
};

const updateTaskDeleteTag = (taskId, tagId) => {
    return {
        type: UPDATE_TASK_DELETE_TAG,
        payload: {
            taskId,
            tagId
        }
    };
}

const updateTaskChangeStatus = (taskId, status) => {
    return {
        type: UPDATE_TASK_CHANGE_STATUS,
        payload: {
            taskId,
            status
        }
    };
};

const updateTaskAddAssigned = (taskId, userId) => {
    return {
        type: UPDATE_TASK_ADD_ASSIGNED,
        payload: {
            taskId,
            userId
        }
    };
};

const updateTaskAddComment = (parentId, label, files) => {
    return {
        type: UPDATE_TASK_ADD_COMMENT,
        payload: {
            id: createNewIndex(),
            parentId,
            dateCreated: new Date(),
            label,
            files
        }
    };
};

const addFile = (file, parentId) => {
    return {
        type: ADD_FILE,
        payload: {
            file: { ...file, id: createNewIndex()},
            parentId,
        }
    };
};

const updateTaskAddFile = (file, parentId) => {
    return {
        type: UPDATE_TASK_ADD_FILE,
        payload: {
            file,
            parentId
        }
    };
};

const updateCommentAddFile = (file, parentId) => {
    return {
        type: UPDATE_COMMENT_ADD_FILE,
        payload: {
            file: { ...file, id: createNewIndex()},
            parentId
        }
    };
};

export {
    projectLoaded,
    addProject,
    addGroup,
    addTask,
    setShowedGroup,
    updateTaskAddTag,
    addTag,
    updateTaskDeleteTag,
    updateTaskChangeStatus,
    updateTaskAddAssigned,
    updateTaskAddComment, 
    addFile,
    updateTaskAddFile,
    updateCommentAddFile,
};