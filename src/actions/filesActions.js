import { FILES_LOADED, ADD_FILE, DELETE_FILE } from '../constants';

export const filesLoaded = (data) => {
    return {
        type: FILES_LOADED,
        payload: data
    };
};

export const addFile = (file, hash, parentId) => {
    return {
        type: ADD_FILE,
        payload: {
            file: { ...file, id: hash},
            parentId,
        }
    };
};

export const deleteFile = (fileId) => {
    return {
        type: DELETE_FILE,
        payload: {
            fileId
        }
    };
};
