import { createSelector } from 'reselect';

export const getAllTagsSelector = createSelector(
    state => state.tags,
    items => items
);
