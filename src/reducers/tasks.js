import { handleActions } from 'redux-actions';

import {
  tasksLoaded,
  addTask,
  updateTaskAddTag,
  updateTaskDeleteTag,
  updateTaskChangeStatus,
  updateTaskAddDateDue,
  updateTaskSetDone,
  updateTaskAddAssigned,
  updateTaskDeleteAssigned,
  updateTaskAddComment,
  updateTaskDeleteComment,
} from '../actions';

import { findItemInList } from '../utils';

const createNewTask = ({ id, label, parentId, dateCreated, action, currentUser }) => {
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
        label: action,
        date: dateCreated,
        user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`,
      },
    ],
  };
};

const updateTasksSetDone = ({ taskId, done }, state) => {
  const updatedTasks = findItemInList(taskId, state,
    (task) => { return { ...task, done }; });
  return updatedTasks;
};

const updateTasksAddTag = ({ taskId, tagId }, state) => {
  const updatedTasks = findItemInList(taskId, state,
    (task) => { return { ...task, tags: [ ...task.tags, tagId ] }; });
  return updatedTasks;
};

const updateTasksDeleteTag = ({ taskId, tagId }, state) => {
  const updatedTasks = findItemInList(taskId, state,
    (task) => {
      const idx = task.tags.findIndex((tag) => tag === tagId);
      return { ...task, tags: [ ...task.tags.slice(0, idx), ...task.tags.slice(idx + 1)] };
    });
  return updatedTasks;
};

const updateTasksChangeStatus = ({ taskId, status, date, action, currentUser }, state) => {
  const updatedTasks = findItemInList(taskId, state,
    (task) => {
      return {
        ...task,
        status,
        history: [
          ...task.history,
          {
            date,
            user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`,
            label: action,
          },
        ],
      };
    });
  return updatedTasks;
};

const updateTasksAddAssigned = ({ taskId, assignedUser, date, action, currentUser }, state) => {
  const updatedTasks = findItemInList(taskId, state,
    (task) => {
      return { ...task,
        assigned: [ ...task.assigned, assignedUser.id ],
        history: [
          ...task.history,
          {
            date,
            user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`,
            label: action + ` ${ assignedUser.firstName } ${ assignedUser.lastName.slice(0, 1) }.`,
          },
        ],
      };
    });
  return updatedTasks;
};

const updateTasksDeleteAssigned = ({ taskId, assignedUser, date, action, currentUser }, state) => {
  const updatedTasks = findItemInList(taskId, state,
    (task) => {
      const userIdx = task.assigned.findIndex((item) => (item === assignedUser.id));
      return {
        ...task,
        assigned: [ ...task.assigned.slice(0, userIdx), ...task.assigned.slice(userIdx + 1) ],
        history: [
          ...task.history,
          {
            date,
            user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`,
            label: action + ` ${ assignedUser.firstName } ${ assignedUser.lastName.slice(0, 1) }.`,
          },
        ],
      };
    });
  return updatedTasks;
};

const updateTasksAddComment = ({ taskId, commentId }, state) => {
  const updatedTasks = findItemInList(taskId, state,
    (task) => { return { ...task, comments: [ ...task.comments, commentId ] }; });
  return updatedTasks;
};

const updateTasksDeleteComment = ({ taskId, commentId }, state) => {
  const updatedTasks = findItemInList(taskId, state,
    (task) => {
      const idx = task.comments.findIndex((comment) => (comment === commentId));
      return { ...task, comments: [ ...task.comments.slice(0, idx), ...task.comments.slice(idx + 1) ] };
    });
  return updatedTasks;
};

const updateTasksAddDateDue = ({ taskId, dateDue, date, action, currentUser }, state) => {
  const updatedTasks = findItemInList(taskId, state,
    (task) => {
      return {
        ...task,
        dateDue,
        history: [
          ...task.history,
          {
            date,
            user: `${ currentUser.firstName } ${ currentUser.lastName.slice(0, 1) }.`,
            label: action,
          },
        ],
      };
    });
  return updatedTasks;
};

const initialState = [];

const tasks = handleActions(
  {
    [tasksLoaded]: (state, { payload: { data } }) => {
      return data;
    },
    [addTask]: (state, { payload }) => {
      const newTask = createNewTask(payload, state);
      return [ ...state, newTask];
    },
    [updateTaskAddTag]: (state, { payload }) => {
      return updateTasksAddTag(payload, state);
    },
    [updateTaskDeleteTag]: (state, { payload }) => {
      return updateTasksDeleteTag(payload, state);
    },
    [updateTaskChangeStatus]: (state, { payload }) => {
      return updateTasksChangeStatus(payload, state);
    },
    [updateTaskAddDateDue]: (state, { payload }) => {
      return updateTasksAddDateDue(payload, state);
    },
    [updateTaskSetDone]: (state, { payload }) => {
      return updateTasksSetDone(payload, state);
    },
    [updateTaskAddAssigned]: (state, { payload }) => {
      return updateTasksAddAssigned(payload, state);
    },
    [updateTaskDeleteAssigned]: (state, { payload }) => {
      return updateTasksDeleteAssigned(payload, state);
    },
    [updateTaskAddComment]: (state, { payload }) => {
      return updateTasksAddComment(payload, state);
    },
    [updateTaskDeleteComment]: (state, { payload }) => {
      return updateTasksDeleteComment(payload, state);
    },
  },
  initialState,
);

export default tasks;
