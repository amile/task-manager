import { combineReducers } from 'redux';

import projects from './projects';
import users from './users';
import groups from './groups';
import tasks from './tasks';
import tags from './tags';
import comments from './comments';
import files from './files';
import currentUser from './currentUser';


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

const getCurrentUser = (state) => {
    return state.users.find((user) => {
        return state.currentUser === user.id
    });
};

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
            return { ...item, tasks: findItemInList(id, item.tasks, changeTask)};
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

const findItemInList = (itemId, state, callback) => {
    return state.map((item) => {
        if (item.id === itemId) {
            return callback(item);
        }
        return item
    });
}

export default combineReducers({ projects, groups, users, currentUser, tasks, tags, comments, files});
