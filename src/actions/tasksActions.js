import { TASKS_LOADED, ADD_TASK, UPDATE_TASK_ADD_TAG, UPDATE_TASK_DELETE_TAG, 
    UPDATE_TASK_CHANGE_STATUS, UPDATE_TASK_ADD_ASSIGNED, UPDATE_TASK_DELETE_ASSIGNED, 
    UPDATE_TASK_ADD_COMMENT, UPDATE_TASK_DELETE_COMMENT, UPDATE_TASK_ADD_DATE_DUE,
    UPDATE_TASK_ADD_FILE } from '../constants';

import { createNewIndex, statusList, getDate, getTime } from '../utils';

export const tasksLoaded = (data) => {
    return {
        type: TASKS_LOADED,
        payload: data
    };
};

export const addTask = (label, parentId, currentUser, history, path) => {
    return {
        type: ADD_TASK,
        history,
        path,
        payload: {
            id: createNewIndex(), 
            label, 
            parentId, 
            dateCreated: new Date(),
            action: 'создал(a) задачу',
            currentUser
        }
    };
};

export const updateTaskAddTag = (taskId, tagId) => {
    return {
        type: UPDATE_TASK_ADD_TAG,
        payload: {
            taskId,
            tagId
        }
    };
};

export const updateTaskDeleteTag = (taskId, tagId) => {
    return {
        type: UPDATE_TASK_DELETE_TAG,
        payload: {
            taskId,
            tagId
        }
    };
}

export const updateTaskChangeStatus = (taskId, status, currentUser) => {
    return {
        type: UPDATE_TASK_CHANGE_STATUS,
        payload: {
            taskId,
            status,
            date: new Date(),
            action: [ `установил(a) статус: ${ statusList[status] }`],
            currentUser
        }
    };
};

export const updateTaskAddAssigned = (taskId, assignedUser, currentUser) => {
    return {
        type: UPDATE_TASK_ADD_ASSIGNED,
        payload: {
            taskId,
            assignedUser,
            date: new Date(),
            action: [`добавил(a) исполнителя:`],
            currentUser
        }
    };
};

export const updateTaskDeleteAssigned = (taskId, assignedUser, currentUser) => {
    return {
        type: UPDATE_TASK_DELETE_ASSIGNED,
        payload: {
            taskId,
            assignedUser,
            date: new Date(),
            action: [`удалил(a) исполнителя:`],
            currentUser
        }
    };
};

export const updateTaskAddComment = (taskId, commentId) => {
    return {
        type: UPDATE_TASK_ADD_COMMENT,
        payload: {
            taskId,
            commentId
        }
    };
};

export const updateTaskDeleteComment = (taskId, commentId) => {
    return {
        type: UPDATE_TASK_DELETE_COMMENT,
        payload: {
            taskId,
            commentId
        }
    };
};

export const updateTaskAddDateDue = (taskId, dateDue, currentUser) => {
    const action = dateDue 
        ? `установил(а) дату исполнения: ${ getDate(dateDue) } ${ getTime(dateDue) }`
        : 'удалил(а) дату исполнения'
    return {
        type: UPDATE_TASK_ADD_DATE_DUE,
        payload: {
            taskId,
            dateDue,
            date: new Date(),
            action: action,
            currentUser
        }
    };
};

export const updateTaskAddFile = (fileId, parentId) => {
    return {
        type: UPDATE_TASK_ADD_FILE,
        payload: {
            fileId,
            parentId
        }
    };
};
