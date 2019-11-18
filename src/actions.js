import { STATE_LOADED, PROJECT_ADDED, GROUP_ADDED, TASK_ADDED } from './constants';

const projectLoaded = (data) => {
    return {
        type: STATE_LOADED,
        payload: data
    };
};

const projectAdded = (projectName) => {
    return {
        type: PROJECT_ADDED,
        payload: projectName
    };
};

const groupAdded = (groupName, groupId) => {
    return {
        type: GROUP_ADDED,
        payload: { groupId, groupName }
    };
};

const taskAdded = (taskName, groupId) => {
    return {
        type: TASK_ADDED,
        payload: { taskName, groupId }
    };
};

export {
    projectLoaded,
    projectAdded,
    groupAdded,
    taskAdded
};