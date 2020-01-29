import { TASKS_LOADED, ADD_TASK, UPDATE_TASK_ADD_TAG, UPDATE_TASK_DELETE_TAG, 
  UPDATE_TASK_CHANGE_STATUS, UPDATE_TASK_ADD_ASSIGNED, UPDATE_TASK_DELETE_ASSIGNED, 
  UPDATE_TASK_ADD_COMMENT,UPDATE_TASK_DELETE_COMMENT, UPDATE_TASK_ADD_DATE_DUE, UPDATE_TASK_SET_DONE } from '../constants';

import { findItemInList } from '../utils';

const createNewTask = ({id, label, parentId, dateCreated, action, currentUser}) => {
  return {
    id,
    parentId,
    label,
    dateCreated,
    user: currentUser.id,
    dateDue: null,
    done: false,
    status: 'acceptance',
    assigned: [],
    tags: [],
    comments: [],
    files: [],
    history: [
      { 
        user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`, 
        label: action, 
        date: dateCreated 
      }
    ]
  };
};

const updateTaskSetDone = ({taskId, done}, state) => {
  const updatedTasks = findItemInList(taskId, state, 
    (task) => {return {...task, done};});
  return updatedTasks;
};

const updateTaskAddTag = (taskId, tagId, state) => {
  const updatedTasks = findItemInList(taskId, state, 
    (task) => {return {...task, tags: [ ...task.tags, tagId ]};});
  return updatedTasks;
};

const updateTaskDeleteTag = (taskId, tagId, state) => {
  const updatedTasks = findItemInList(taskId, state, 
    (task) => {
      const idx = task.tags.findIndex((tag) => tag === tagId);
      return { ...task, tags: [ ...task.tags.slice(0, idx), ...task.tags.slice(idx + 1)] };
    });
  return updatedTasks;
};

const updateTaskChangeStatus = ({taskId, status, date, action, currentUser}, state) => {
  const updatedTasks = findItemInList(taskId, state, 
    (task) => {
      return { ...task, status: status, history: 
                [ ...task.history, { date: date, user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`, label: action}] 
      };
    });
  return updatedTasks;
};

const updateTaskAddAssigned = ({taskId, assignedUser, date, action, currentUser}, state) => {
  const updatedTasks = findItemInList(taskId, state, 
    (task) => {
      return { ...task, 
        assigned: [ ...task.assigned, assignedUser.id ],
        history: [ ...task.history, 
          { 
            date: date, 
            user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`, 
            label: action + ` ${ assignedUser.firstName } ${ assignedUser.lastName.slice(0, 1) }.`
          }
        ]
      };
    });
  return updatedTasks;
};

const updateTaskDeleteAssigned = ({taskId, assignedUser, date, action, currentUser}, state) => {
  const updatedTasks = findItemInList(taskId, state, 
    (task) => {
      const userIdx = task.assigned.findIndex((item) => item === assignedUser.id);
      return { ...task, 
        assigned: [ ...task.assigned.slice(0, userIdx), ...task.assigned.slice(userIdx + 1) ],
        history: [ ...task.history, 
          { 
            date: date, 
            user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`, 
            label: action + ` ${ assignedUser.firstName } ${ assignedUser.lastName.slice(0, 1) }.`
          } 
        ]
      };
    });
  return updatedTasks;
};

const updateTaskAddComment = (taskId, commentId, state) => {
  const updatedTasks = findItemInList(taskId, state, 
    (task) => {return { ...task, comments: [ ...task.comments, commentId ] };});
  return updatedTasks;
};

const updateTaskDeleteComment = (taskId, commentId, state) => {
  const updatedTasks = findItemInList(taskId, state, 
    (task) => {
      const idx = task.comments.findIndex((comment) => comment === commentId);
      return { ...task, comments: [ ...task.comments.slice(0, idx), ...task.comments.slice(idx + 1) ] };
    });
  return updatedTasks;
};

const updateTaskAddDateDue = ({taskId, dateDue, date, action, currentUser}, state) => {
  const updatedTasks = findItemInList(taskId, state, 
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
      };
    });
  return updatedTasks;
};

/* const updateTaskAddFile = (taskId, fileId, state) => {
    const updatedTasks = findItemInList(taskId, state, 
        (task) => {return { ...task, files: [ ...task.files, fileId ] }});
    return updatedTasks;
} */

const tasks = (state = [], action) => {
  switch (action.type) {

  case TASKS_LOADED:
    return action.payload;

  case ADD_TASK:
    const newTask = createNewTask({ ...action.payload }, state);
    return [ ...state, newTask];

  case UPDATE_TASK_ADD_TAG:
    return updateTaskAddTag(action.payload.taskId, action.payload.tagId, state);

  case UPDATE_TASK_SET_DONE:
    return updateTaskSetDone(action.payload, state);  

  case UPDATE_TASK_DELETE_TAG:
    return updateTaskDeleteTag(action.payload.taskId, action.payload.tagId, state);
        
  case UPDATE_TASK_CHANGE_STATUS:
    return updateTaskChangeStatus(action.payload, state);

  case UPDATE_TASK_ADD_DATE_DUE:
    return updateTaskAddDateDue(action.payload, state);
        
  case UPDATE_TASK_ADD_ASSIGNED:
    return updateTaskAddAssigned(action.payload, state);

  case UPDATE_TASK_DELETE_ASSIGNED:
    return updateTaskDeleteAssigned(action.payload, state);

  case UPDATE_TASK_ADD_COMMENT:
    return updateTaskAddComment(action.payload.taskId, action.payload.commentId, state);

  case UPDATE_TASK_DELETE_COMMENT:
    return updateTaskDeleteComment(action.payload.taskId, action.payload.commentId, state);

  default:
    return state;
  }
};

export default tasks;