import { createSelector } from 'reselect';

export const projectsSelector = createSelector(
    state => state.projects,
    items => items
);

export const showedGroupID = state => state.showedGroup;

export const groupsSelector = createSelector(
    state => state.groups,
    items => items
);

export const showedGroupSelector = createSelector(
    showedGroupID,
    groupsSelector,
    (groupId, groups) => groups.find( (group) => group.id === groupId )
);

export const parentGroupId = (_, props) => props.group.id;

/* export const makeInnerGroupsSelector1 = () => {
    return createSelector (
        groupsSelector,
        groupsIdList,
        (groups, groupsListId) => groupsListId.map(
            (item) => groups.find((group) => item.id === group.id)
        )
    );
}; */

export const makeInnerGroupsSelector = () => {
    return createSelector (
        groupsSelector,
        parentGroupId,
        (groups, parentId) => groups.filter( (group) => group.parentId === parentId )
    );
};

export const tasksSelector = createSelector(
    state => state.tasks,
    items => items
);

export const makeInnerTasksSelector = () => {
    return createSelector(
        tasksSelector,
        parentGroupId,
        (tasks, parentId) => tasks.filter( (task) => task.parentId === parentId )
    );
};

const currentUserID = state => state.currentUser;

export const usersSelector = createSelector(
    state => state.users,
    items => items
);

export const currentUserSelector = createSelector(
    currentUserID,
    (userId, state) => state.users.filter( (user) => user.id === userId )
);

const findGroup = (id, items) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            return items[i];
        }
        else if (items[i].groups && (items[i].groups.length > 0)) {
            findGroup(id, items[i].groups);
        }
    }
}
export const showedTaskId = (_, props) => props.itemId;

export const showedTaskSelector = createSelector(
    tasksSelector,
    showedTaskId,
    (tasks, showedTaskId) => tasks.find(task => task.id === showedTaskId)
);

export const taskCreatedByUserIdSelector = createSelector(
    showedTaskSelector,
    item => item.user,
);

export const taskCreatedByUserSelector = createSelector(
    taskCreatedByUserIdSelector,
    usersSelector,
    (userId, users) => users.find((user) => user.id === userId)
);

export const taskAssignedUsersIdSelector = createSelector(
    showedTaskSelector,
    item => item.assigned,
);

export const taskAssignedUsersSelector = createSelector(
    taskAssignedUsersIdSelector,
    usersSelector,
    (assigned, users) => (assigned.length > 0) ? assigned.map(
        (item) => users.find((user) => item === user.id)
    ) : null
);
export const commentUserId = (_, props) => props.comment.user;

export const makeCommentCreatedByUserSelector = () => {
    return createSelector(
        commentUserId,
        usersSelector,
        (userId, users) => users.find((user) => user.id === userId)
    );
};

export const getAllTagsSelector = createSelector(
    state => state.tags,
    items => items
);

export const getTaskTagsId = (_, props) => props.task.tags;

export const getTaskTagsSelector = createSelector(
    getTaskTagsId,
    getAllTagsSelector,
    (tagsIdList, tags) => (tagsIdList.length > 0) ? tagsIdList.map(
        (id) => tags.find((tag) => id === tag.id)
    ) : null
);