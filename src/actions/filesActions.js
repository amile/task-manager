import { createActions } from 'redux-actions';

export const {
  filesLoaded,
  addFile,
  deleteFile,
} = createActions({
  FILES_LOADED: (data) => ({ data }),
  ADD_FILE: (file, hash, parentId) => ({
    parentId,
    file: { ...file, id: hash },
  }),
  DELETE_FILE: (fileId) => ({ fileId }),
});
