import initialState from './getDefaultState';
import { STATE_LOADED, PROJECT_ADDED, GROUP_ADDED, TASK_ADDED } from './constants';

let idx = 10;

const findGroup = (id, list, newItem, changeList) => {
    const newList = list.map((item) => {
        if (item.id === id) {
            return changeList(item, newItem);
        } else if (!item.groups || (item.groups.length < 1)) {
            return item;
        } else {
            return { ...item, groups: findGroup(id, item.groups, newItem, changeList)};
        }
    });
    return newList;
}

const changeGroupList = (item, newItem) => {
    const groupsNew = [...item.groups, newItem];
    return { ...item, groups: groupsNew};
}
const changeTaskList = (item, newItem) => {
    const groupsNew = [...item.tasks, newItem];
    return { ...item, tasks: groupsNew};
}

const findTask = (id, list, newTag, changeTask) => {
    const newList = list.map((item) => {
        if (item.id === id) {
            return changeTask(item, newTag);
        } else if (!item.tasks || (item.tasks.length < 1)) {
            return item;
        } else {
            return { ...item, tasks: findTask(id, item.tasks, changeTask)};
        }
    });
    return newList;
}

const addTagToTask = (task, newTag) => {
    return { ...task, tags: [ ...task.tags, newTag ]};
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case STATE_LOADED :
            console.log('hello reducer', action.payload)
            return action.payload;

        case PROJECT_ADDED:
            const newProject = {
                id: (++idx).toString(), 
                label: action.payload,
                groups: []
            };
            return {
                ...state,
                projects: [...state.projects, newProject]
            }

        case GROUP_ADDED:
            const newGroup = {
                id: (++idx).toString(), 
                label: action.payload.groupName,
                groups: [],
                tasks: [],
                active: false
            };
            return {
                ...state,
                projects: findGroup(action.payload.groupId, state.projects, newGroup, changeGroupList)
            };

        case TASK_ADDED:
            const newTask = {
                id: (++idx).toString(), 
                label: action.payload.taskName
            };
            return {
                ...state,
                projects: findGroup(action.payload.groupId, state.projects, newTask, changeTaskList)
            };
        
        case 'TASK_CHANGED_TAG_ADDED':
            return {
                ...state,
                projects: findTask(action.payload.taskId, state.projects, newTag, addTagToTask)
            }
        default:
            return state;

    }
};

export default reducer;