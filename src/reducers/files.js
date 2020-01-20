import { FILES_LOADED, DELETE_FILE, 
    ADD_FILE } from '../constants';

const files = (state = [], action) => {
    switch (action.type) {

        case FILES_LOADED:
            return action.payload

        case ADD_FILE:
            return [ ...state, action.payload.file];

        case DELETE_FILE:
            const fileIdx = state.findIndex((file) => file.id === action.payload.fileId);
            return [ ...state.slice(0, fileIdx), ...state.slice(fileIdx + 1)];

        default:
            return state;
    }
};

export default files;