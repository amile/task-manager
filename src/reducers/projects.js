import { PROJECTS_LOADED, ADD_PROJECT } from '../constants';

const projects = (state = [], action) => {
    switch (action.type) {

        case PROJECTS_LOADED:
            return action.payload

        case ADD_PROJECT:
            const newProject = {
                ...action.payload
            };
            return [...state, newProject]

        default:
            return state;
    }
};

export default projects;