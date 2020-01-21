import { GROUPS_LOADED, ADD_GROUP } from '../constants';

import { createNewIndex } from '../utils';

export const groupsLoaded = (data) => {
    return {
        type: GROUPS_LOADED,
        payload: data
    };
};

export const addGroup = (label, parentId) => {
    return {
        type: ADD_GROUP,
        payload: {
            id: createNewIndex(),
            parentId, 
            label
        }
    };
};
