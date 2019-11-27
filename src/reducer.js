
import initialState from './getDefaultState';
import { STATE_LOADED, ADD_PROJECT, ADD_GROUP, ADD_TAG, ADD_TASK, SET_SHOWED_GROUP,
    UPDATE_TASK_ADD_TAG, UPDATE_TASK_DELETE_TAG, UPDATE_TASK_CHANGE_STATUS,
    UPDATE_TASK_ADD_ASSIGNED } from './constants';


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

const oldFindTask = (id, list, newTag, changeTask) => {
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

const oldupdateTaskAddTag = (taskId, tagId, state) => {
    const updatedTasks = state.tasks.map((task) => {
        if (task.id === taskId) {
            return {...task, tags: [ ...task.tags, tagId ]}
        }
        return task
    });
    return updatedTasks
}

const createNewTask = ({id, label, parentId, dateCreated}, state) => {
    console.log('reduser', id, label, parentId, dateCreated, state)
    return {
        id,
        parentId,
        label,
        dateCreated,
        user: state.currentUser,
        status: 'acceptance',
        assigned: [],
        tags: [],
        comments: [],
        history: [{user: state.currentUser, label: 'создал задачу', date: dateCreated}]
    };
}

const findTask = (taskId, state, callback) => {
    return state.tasks.map((task) => {
        if (task.id === taskId) {
            return callback(task);
        }
        return task
    });
}

const updateTaskAddTag = (taskId, tagId, state) => {
    const updatedTasks = findTask(taskId, state, 
        (task) => {return {...task, tags: [ ...task.tags, tagId ]}});
    return updatedTasks
}

const updateTaskDeleteTag = (taskId, tagId, state) => {
    const updatedTasks = findTask(taskId, state, 
        (task) => {
            const idx = task.tags.findIndex((tag) => tag === tagId);
            return { ...task, tags: [ ...task.tags.slice(0, idx), ...task.tags.slice(idx + 1)] }
        });
    return updatedTasks;
}

const updateTaskChangeStatus = (taskId, status, state) => {
    const updatedTasks = findTask(taskId, state, 
        (task) => {return { ...task, status: status }});
    return updatedTasks
}

const updateTaskAddAssigned = (taskId, userId, state) => {
    const updatedTasks = findTask(taskId, state, 
        (task) => {return { ...task, assigned: [ ...task.assigned, userId ] }});
    return updatedTasks;
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STATE_LOADED :
            return action.payload;

        case ADD_PROJECT:
            const newProject = {
                ...action.payload
            };
            return {
                ...state,
                projects: [...state.projects, newProject]
            }

        case ADD_GROUP:
            const newGroup = {
                ...action.payload
            };
            return {
                ...state,
                groups: [ ...state.groups, newGroup ],

            };

        case ADD_TASK:
            const newTask = createNewTask({ ...action.payload }, state);
            return {
                ...state,
                tasks: [ ...state.tasks, newTask]
            };

        case SET_SHOWED_GROUP:
            return {
                ...state,
                showedGroup: action.payload.parentId
            };
        
        case ADD_TAG:
            return {
                ...state,
                tags: [ ...state.tags, action.payload.tag]
            };

        case UPDATE_TASK_ADD_TAG:
            return {
                ...state,
                tasks: updateTaskAddTag(action.payload.taskId, action.payload.tagId, state),
            };

        case UPDATE_TASK_DELETE_TAG:
            return {
                ...state,
                tasks: updateTaskDeleteTag(action.payload.taskId, action.payload.tagId, state),
            };
        
        case UPDATE_TASK_CHANGE_STATUS:
            return {
                ...state,
                tasks: updateTaskChangeStatus(action.payload.taskId, action.payload.status, state),
            };
        
        case UPDATE_TASK_ADD_ASSIGNED:
            return {
                ...state,
                tasks: updateTaskAddAssigned(action.payload.taskId, action.payload.userId, state),
            }

        default:
            return state;

    }
};

export default reducer;
