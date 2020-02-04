import { createActions } from 'redux-actions';

export const { tagsLoaded, addTag } = createActions({
  TAGS_LOADED: (data) => ({ data }),
  ADD_TAG: (id, tag) => ({
    id,
    tag,
  }),
});
