
import initialState from './getDefaultState';
import { STATE_LOADED, ADD_PROJECT, ADD_GROUP, ADD_TAG, ADD_TASK, SET_SHOWED_GROUP,
    UPDATE_TASK_ADD_TAG, UPDATE_TASK_DELETE_TAG, UPDATE_TASK_CHANGE_STATUS,
    UPDATE_TASK_ADD_ASSIGNED, UPDATE_TASK_DELETE_ASSIGNED, UPDATE_TASK_ADD_COMMENT,
    UPDATE_TASK_DELETE_COMMENT,
    UPDATE_TASK_ADD_DATE_DUE, ADD_FILE, UPDATE_TASK_ADD_FILE, UPDATE_COMMENT_ADD_FILE,
    UPDATE_COMMENT_DELETE_FILE } from './constants';


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

const createNewTask = ({id, label, parentId, dateCreated, action}, state) => {
    const currentUser = state.users.find((user) => {
        return state.currentUser === user.id
    });
    return {
        id,
        parentId,
        label,
        dateCreated,
        user: currentUser.id,
        dateDue: null,
        status: 'acceptance',
        assigned: [],
        tags: [],
        comments: [],
        files: [],
        history: [{ user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`, label: action, date: dateCreated }]
    };
}

const createNewComment = (id, parentId, label, dateCreated, state) => {
    return {
        id,
        parentId,
        label,
        dateCreated,
        user: state.currentUser,
        files: []
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

const findComment = (commentId, state, callback) => {
    return state.comments.map((comment) => {
        if (comment.id === commentId) {
            return callback(comment);
        }
        return comment
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

const updateTaskChangeStatus = ({taskId, status, date, action}, state) => {
    const currentUser = state.users.find((user) => {
        return state.currentUser === user.id
    });
    const updatedTasks = findTask(taskId, state, 
        (task) => {
            return { ...task, status: status, history: 
                [ ...task.history, { date: date, user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`, label: action}] 
            }
        });
    return updatedTasks
}

const updateTaskAddAssigned = ({taskId, userId, date, action}, state) => {
    const currentUser = getCurrentUser(state);
    const assignedUser = state.users.find((user) => {
        return userId === user.id
    });
    const updatedTasks = findTask(taskId, state, 
        (task) => {
            return { ...task, 
                assigned: [ ...task.assigned, userId ],
                history: [ ...task.history, 
                    { 
                        date: date, 
                        user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`, 
                        label: action + ` ${ assignedUser.firstName } ${ assignedUser.lastName.slice(0, 1) }.`
                    }
                ]
            }
        });
    return updatedTasks;
}

const updateTaskDeleteAssigned = ({taskId, userId, date, action}, state) => {
    const currentUser = state.users.find((user) => {
        return state.currentUser === user.id
    });
    const deletedUser = state.users.find((user) => {
        return userId === user.id
    });
    const updatedTasks = findTask(taskId, state, 
        (task) => {
            const userIdx = task.assigned.findIndex((item) => item === userId);
            console.log(userIdx);
            return { ...task, 
                assigned: [ ...task.assigned.slice(0, userIdx), ...task.assigned.slice(userIdx + 1) ],
                history: [ ...task.history, 
                    { 
                        date: date, 
                        user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`, 
                        label: action + ` ${ deletedUser.firstName } ${ deletedUser.lastName.slice(0, 1) }.`
                    } 
                ]
            }
        });
    return updatedTasks;
}

const updateTaskAddComment = (taskId, commentId, state) => {
    const updatedTasks = findTask(taskId, state, 
        (task) => {return { ...task, comments: [ ...task.comments, commentId ] }});
    return updatedTasks;
}

const updateTaskDeleteComment = (taskId, commentId, state) => {
    const updatedTasks = findTask(taskId, state, 
        (task) => {
            const idx = task.comments.findIndex((comment) => comment === commentId)
            return { ...task, comments: [ ...task.comments.slice(0, idx), ...task.comments.slice(idx + 1) ] }
        });
    return updatedTasks;
}

const updateTaskAddDateDue = ({taskId, dateDue, date, action}, state) => {
    const currentUser = getCurrentUser(state);
    const updatedTasks = findTask(taskId, state, 
        (task) => {
            return { ...task, 
                dateDue: dateDue,
                history: [ ...task.history, 
                    { 
                        date: date, 
                        user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`, 
                        label: action
                    }
                ]
            }
        });
    return updatedTasks;
}

const updateTaskAddFile = (taskId, fileId, state) => {
    const updatedTasks = findTask(taskId, state, 
        (task) => {return { ...task, files: [ ...task.files, fileId ] }});
    return updatedTasks;
}

const updateCommentAddFile = (commentId, fileId, state) => {
    const updatedComments = findComment(commentId, state, 
        (comment) => {return { ...comment, files: [ ...comment.files, fileId ] }});
    return updatedComments;
}

const updateCommentDeleteFile = ({ parentId, fileId }, state) => {
    const updatedComments = findComment(parentId, state, 
        (comment) => {
            
            const idx = comment.files.findIndex((file) => file === fileId)
            return { ...comment, files: [ ...comment.files.slice(0, idx), ...comment.files.slice(idx + 1) ] }
        });
    return updatedComments;
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
                tasks: updateTaskChangeStatus(action.payload, state),
            };
        
        case UPDATE_TASK_ADD_ASSIGNED:
            return {
                ...state,
                tasks: updateTaskAddAssigned(action.payload, state),
            }

        case UPDATE_TASK_DELETE_ASSIGNED:
            return {
                ...state,
                tasks: updateTaskDeleteAssigned(action.payload, state),
            }

        case UPDATE_TASK_ADD_COMMENT:
            const newComment = createNewComment(action.payload.id, action.payload.parentId,
                action.payload.label, action.payload.dateCreated, state);
            return {
                ...state,
                tasks: updateTaskAddComment(action.payload.parentId, action.payload.id, state),
                comments: [ ...state.comments, newComment]
            }

        case UPDATE_TASK_DELETE_COMMENT:
            const commentIdx = state.comments.findIndex((comment) => comment.id === action.payload.commentId)
            return {
                ...state,
                tasks: updateTaskDeleteComment(action.payload.taskId, action.payload.commentId, state),
                comments: [ ...state.comments.slice(0, commentIdx), ...state.comments.slice(commentIdx + 1)]
            }

        case ADD_FILE:
            return {
                ...state,
                files: [ ...state.files, action.payload.file]
        }

        case UPDATE_TASK_ADD_FILE:
            return {
                ...state,
                tasks: updateTaskAddFile(action.payload.parentId, action.payload.fileId, state)
        }

        case UPDATE_TASK_ADD_DATE_DUE:
            return {
                ...state,
                tasks: updateTaskAddDateDue(action.payload, state)
        }

        case UPDATE_COMMENT_ADD_FILE:
            return {
                ...state,
                comments: updateCommentAddFile(action.payload.parentId, action.payload.fileId, state)
        }

        case UPDATE_COMMENT_DELETE_FILE:
            return {
                ...state,
                comments: updateCommentDeleteFile(action.payload, state)
        }

        default:
            return state;

    }
};

export default reducer;
