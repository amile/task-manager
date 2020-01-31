import { createActions } from 'redux-actions';

import { createNewIndex } from '../utils';

export const { tagsLoaded, addTag } = createActions({
  TAGS_LOADED: (data) => ({ data }),
  ADD_TAG: (id, tag) => ({
    id,
    tag: { ...tag, id: createNewIndex()},
  }),
});
