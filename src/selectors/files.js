import { createSelector } from 'reselect';

export const getAllFilesSelector = createSelector(
  state => state.files,
  items => items
);
