import { STATE_LOADED, LOGIN_USER, SET_CURRENT_USER, ADD_PROJECT, ADD_GROUP, 
    ADD_TASK, ADD_TAG, SET_SHOWED_GROUP,
    UPDATE_TASK_ADD_TAG, UPDATE_TASK_DELETE_TAG, UPDATE_TASK_CHANGE_STATUS,
    UPDATE_TASK_ADD_ASSIGNED, UPDATE_TASK_DELETE_ASSIGNED, UPDATE_TASK_ADD_COMMENT, 
    UPDATE_TASK_DELETE_COMMENT, ADD_FILE, DELETE_FILE, 
    UPDATE_TASK_ADD_DATE_DUE, UPDATE_TASK_ADD_FILE, UPDATE_COMMENT_ADD_FILE,
    UPDATE_COMMENT_DELETE_FILE } from './constants';

import { createNewIndex, statusList, getCalendarDate, getTime } from './utils';

const projectLoaded = (data) => {
    return {
        type: STATE_LOADED,
        payload: data
    };
};

const loginUser = (login, pass) => {
    return {
        type: LOGIN_USER,
        payload: { 
           login,
           pass 
        }
    };
};

const setCurrentUser = (userId) => {
    return {
        type: SET_CURRENT_USER,
        payload: userId
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

const updateTaskDeleteComment = (taskId, commentId) => {
    return {
        type: UPDATE_TASK_DELETE_COMMENT,
        payload: {
            taskId,
            commentId
        }
    };
};

const updateTaskAddDateDue = (taskId, dateDue) => {
    const action = dateDue 
        ? `установил(а) дату исполнения: ${ getCalendarDate(dateDue) } ${ getTime(dateDue) }`
        : 'удалил(а) дату исполнения'
    return {
        type: UPDATE_TASK_ADD_DATE_DUE,
        payload: {
            taskId,
            dateDue,
            date: new Date(),
            action: action
        }
    };
};

const addFile = (file, hash, parentId) => {
    return {
        type: ADD_FILE,
        payload: {
            file: { ...file, id: hash},
            parentId,
        }
    };
};

const deleteFile = (fileId) => {
    return {
        type: DELETE_FILE,
        payload: {
            fileId,
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
    return {
        type: UPDATE_COMMENT_ADD_FILE,
        payload: {
            fileId,
            parentId
        }
    };
};

const updateCommentDeleteFile = (parentId, fileId) => {
    return {
        type: UPDATE_COMMENT_DELETE_FILE,
        payload: {
            parentId,
            fileId
        }
    };
};

export {
    projectLoaded,
    loginUser,
    setCurrentUser,
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
    updateTaskDeleteComment,
    updateTaskAddDateDue, 
    addFile,
    deleteFile,
    updateTaskAddFile,
    updateCommentAddFile,
    updateCommentDeleteFile
};