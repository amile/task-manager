import { handleActions } from 'redux-actions';

import { projectsLoaded, addProject } from '../actions';

const initialState = [];

const projects = handleActions(
  {
    [projectsLoaded]: (state, { payload: { data } }) => {
      return data;
    },
    [addProject]: (state, { payload }) => {
      const newProject = { ...payload };
      return [ ...state, newProject ];
    },
  },
  initialState,
);

export default projects;
