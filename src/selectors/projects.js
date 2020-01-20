import { createSelector } from 'reselect';

export const projectsSelector = createSelector(
    state => state.projects,
    items => items
);
