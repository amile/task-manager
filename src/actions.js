import { STATE_LOADED, ADD_PROJECT, ADD_GROUP, ADD_TASK, ADD_TAG, SET_SHOWED_GROUP,
    UPDATE_TASK_ADD_TAG, UPDATE_TASK_DELETE_TAG, UPDATE_TASK_CHANGE_STATUS } from './constants';

import { formatDate, createNewIndex } from './utils';

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

const addTask = (label, parentId) => {
    return {
        type: ADD_TASK,
        payload: {
            id: createNewIndex(), 
            label, 
            parentId, 
            dateCreated: formatDate(new Date())
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

export {
    projectLoaded,
    addProject,
    addGroup,
    addTask,
    setShowedGroup,
    updateTaskAddTag,
    addTag,
    updateTaskDeleteTag,
    updateTaskChangeStatus
};