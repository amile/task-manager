import { PROJECTS_LOADED, ADD_PROJECT } from '../constants';

import { createNewIndex } from '../utils';

export const projectsLoaded = (data) => {
  return {
    type: PROJECTS_LOADED,
    payload: data
  };
};

export const addProject = (label) => {
  return {
    type: ADD_PROJECT,
    payload: {
      id: createNewIndex(),
      label
    }
  };
};
