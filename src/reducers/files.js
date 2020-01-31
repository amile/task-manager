import { handleActions } from 'redux-actions';

import { filesLoaded, addFile, deleteFile  } from '../actions';

const initialState = [];

const files = handleActions(
  {
    [filesLoaded]: (state, { payload: { data } }) => {
      return data;
    },
    [addFile]: (state, { payload: { file } }) => {
      return [ ...state, file ];
    },
    [deleteFile]: (state, { payload: { fileId } }) => {
      const fileIdx = state.findIndex((file) => (file.id === fileId));
      return [ ...state.slice(0, fileIdx), ...state.slice(fileIdx + 1)];
    },
  },
  initialState,
);

export default files;
