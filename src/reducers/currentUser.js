import { SET_CURRENT_USER } from '../constants';

const currentUser = (state = null, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.payload;
        default:
            return state;
    }
};

export default currentUser;