import { GROUPS_LOADED, ADD_GROUP } from '../constants';

const groups = (state = [], action) => {
    switch (action.type) {

        case GROUPS_LOADED:
            return action.payload

        case ADD_GROUP:
            const newGroup = {
                ...action.payload
            };
            return [ ...state, newGroup ];

        default:
            return state;
    }
};

export default groups;