import { STATE_LOADED, ADD_PROJECT, ADD_GROUP, ADD_TASK, ADD_TAG, SET_SHOWED_GROUP,
    UPDATE_TASK_ADD_TAG, UPDATE_TASK_DELETE_TAG, UPDATE_TASK_CHANGE_STATUS,
    UPDATE_TASK_ADD_ASSIGNED, UPDATE_TASK_DELETE_ASSIGNED, UPDATE_TASK_ADD_COMMENT, ADD_FILE, 
    UPDATE_TASK_ADD_DATE_DUE, UPDATE_TASK_ADD_FILE, UPDATE_COMMENT_ADD_FILE } from './constants';

import { createNewIndex, statusList } from './utils';

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

const addTask = (label, parentId, history, path) => {
    return {
        type: ADD_TASK,
        history,
        path,
        payload: {
            id: createNewIndex(), 
            label, 
            parentId, 
            dateCreated: new Date(),
            action: 'создал(a) задачу'
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
            status,
            date: new Date(),
            action: [ `установил(a) статус: ${ statusList[status] }`]
        }
    };
};

const updateTaskAddAssigned = (taskId, userId) => {
    return {
        type: UPDATE_TASK_ADD_ASSIGNED,
        payload: {
            taskId,
            userId,
            date: new Date(),
            action: [`добавил(a) исполнителя:`]
        }
    };
};

const updateTaskDeleteAssigned = (taskId, userId) => {
    return {
        type: UPDATE_TASK_DELETE_ASSIGNED,
        payload: {
            taskId,
            userId,
            date: new Date(),
            action: [`удалил(a) исполнителя:`]
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

const updateTaskAddDateDue = (taskId, date) => {
    return {
        type: UPDATE_TASK_ADD_DATE_DUE,
        payload: {
            taskId,
            date
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

const updateTaskAddFile = (fileId, parentId) => {
    return {
        type: UPDATE_TASK_ADD_FILE,
        payload: {
            fileId,
            parentId
        }
    };
};

const updateCommentAddFile = (fileId, parentId) => {
    console.log('action', fileId, parentId)
    return {
        type: UPDATE_COMMENT_ADD_FILE,
        payload: {
            fileId,
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
    updateTaskDeleteAssigned,
    updateTaskAddComment,
    updateTaskAddDateDue, 
    addFile,
    updateTaskAddFile,
    updateCommentAddFile,
};