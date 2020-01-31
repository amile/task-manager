import { createActions } from 'redux-actions';

import {
  createNewIndex,
  statusList,
  getDate,
  getTime,
} from '../utils';

export const {
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
} = createActions({
  TASKS_LOADED: (data) => ({ data }),
  ADD_TASK: (label, parentId, currentUser, history, path) => ({
    path,
    history,
    label,
    parentId,
    currentUser,
    id: createNewIndex(),
    dateCreated: new Date(),
    action: 'создал(a) задачу',
  }),
  UPDATE_TASK_ADD_TAG: (taskId, tagId) => ({ taskId, tagId }),
  UPDATE_TASK_DELETE_TAG: (taskId, tagId) => ({ taskId, tagId }),
  UPDATE_TASK_CHANGE_STATUS: (taskId, status, currentUser) => ({
    taskId,
    status,
    currentUser,
    date: new Date(),
    action: [ `установил(a) статус: ${ statusList[status] }`],
  }),
  UPDATE_TASK_ADD_DATE_DUE: (taskId, dateDue, currentUser) => {
    const action = dateDue
      ? `установил(а) дату исполнения: ${ getDate(dateDue) } ${ getTime(dateDue) }`
      : 'удалил(а) дату исполнения';
    return {
      taskId,
      dateDue,
      action,
      currentUser,
      date: new Date(),
    };
  },
  UPDATE_TASK_SET_DONE: (taskId, done) => ({ taskId, done }),
  UPDATE_TASK_ADD_ASSIGNED: (taskId, assignedUser, currentUser) => ({
    taskId,
    currentUser,
    assignedUser,
    date: new Date(),
    action: [`добавил(a) исполнителя:`],
  }),
  UPDATE_TASK_DELETE_ASSIGNED: (taskId, assignedUser, currentUser) => ({
    taskId,
    currentUser,
    assignedUser,
    date: new Date(),
    action: [`удалил(a) исполнителя:`],
  }),
  UPDATE_TASK_ADD_COMMENT: (taskId, commentId) => ({ taskId, commentId }),
  UPDATE_TASK_DELETE_COMMENT: (taskId, commentId) => ({ taskId, commentId }),
});
