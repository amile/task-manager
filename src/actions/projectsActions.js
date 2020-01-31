import { createActions } from 'redux-actions';

import { createNewIndex } from '../utils';

export const { projectsLoaded, addProject } = createActions({
  PROJECTS_LOADED: (data) => ({ data }),
  ADD_PROJECT: (label) => ({ label, id: createNewIndex() }),
});
