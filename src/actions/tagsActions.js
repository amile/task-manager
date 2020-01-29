import { TAGS_LOADED, ADD_TAG } from '../constants';

import { createNewIndex } from '../utils';

export const tagsLoaded = (data) => {
  return {
    type: TAGS_LOADED,
    payload: data
  };
};

export const addTag = (id, tag) => {
  return {
    type: ADD_TAG,
    payload: {
      id,
      tag: { ...tag, id: createNewIndex()}
    }
  };
};
