import { createSelector } from 'reselect';

export const currentUserID = state => state.currentUser;

export const usersSelector = createSelector(
    state => state.users,
    items => items
);

export const currentUserSelector = createSelector(
    currentUserID,
    usersSelector,
    (userId, users) => users.find((user) => user.id === userId)
);

