import { combineReducers } from 'redux';

import projects from './projects';
import users from './users';
import groups from './groups';
import tasks from './tasks';
import tags from './tags';
import comments from './comments';
import files from './files';
import currentUser from './currentUser';

export default combineReducers({ projects, groups, users, currentUser, tasks, tags, comments, files});
