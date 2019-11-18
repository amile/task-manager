import { createSelector } from 'reselect';

export const showedGroupID = state => state.showedGroup;

export const projectsSelector = createSelector(
    state => state.projects,
    items => items
);

const currentUserID = state => state.currentUser;

export const currentUserSelector = createSelector(
    currentUserID,
    (userId, state) => state.users.filter( user => user.id === userId)
);

const findGroup1 = (id, items) => {
    return {id, items}
}
export const defaultState = {
    currentUser: null,
    users: [],
    showedGroup: '346',
    projects: [
        {   id: '345', 
            label: 'НеРадио', 
            groups: [
                {id: '1', label: 'Learn React', groups:[], 
            tasks: [{id: '3', label: 'React task1'}, {id: '4', label: 'React task2'}],
            active: false}, 
                {id: '2', label: 'Learn Redux', 
                groups:[
                    {id: '6', label: 'Learn Redux-saga', groups:[], tasks: [], active: false}], 
                tasks: [], 
                active: false}]
        },
        {id: '346', label: 'Inanomo', groups: []}
    ]
};

const findGroup = (id, items) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
            console.log('ehu');
            return items[i];
        }
        else if (items[i].groups && (items[i].groups.length > 0)) {
            findGroup(id, items[i].groups);
        }
    }
}

export const showedGroup = createSelector(
    showedGroupID,
    projectsSelector,
    (id, items) => findGroup(id, items)
);
const group = findGroup('345', defaultState)
console.log('Selector', group);