import React from 'react';

import './project-menu.sass';

const ProjectMenu = ({ addGroup, deleteProject }) => {
    return (
        <ul className='project-menu' onClick={(e) => e.stopPropagation()}>
            <li className='project-menu__item' onClick={ addGroup }>Добавить группу</li>
            <li className='project-menu__item project-menu__item_delete' onClick={ deleteProject }>Удалить проект</li>
        </ul>
    );
}
export default ProjectMenu;