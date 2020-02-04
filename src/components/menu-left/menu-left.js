import React, { Component } from 'react';

import AddGroupForm from '../add-group-form';
import ConnectedMenuLeftItem from '../menu-left-item';

import './menu-left.sass';

class MenuLeft extends Component {
  constructor() {
    super();
    this.state = {
      maxLevel: 3,
    };
  }

  render() {
    const level = 0;
    const {
      projects,
      showAddProjectForm,
      addGroup,
      onAddProject,
      onSubmitProject,
      onCloseAddProjectForm,
    } = this.props;
    const listProjects = (projects.length === 0)
      ? null
      : projects.map((project) => {
        return (
          <li
            key={project.id}
            className="list-item projects-list__item projects-list__item_project"
          >
            <ConnectedMenuLeftItem
              group={project}
              level={level}
              maxLevel={this.state.maxLevel}
              addGroup={addGroup}
            />
          </li>
        );
      });
    const addForm = showAddProjectForm
      ? (
        <AddGroupForm
          project
          addNewItem={onSubmitProject}
          onCloseForm={onCloseAddProjectForm}
        />
      )
      : null;
    return (
      <div className="menu-left">
        <div className="menu-left__container">
          <div className="menu-left__item">
            Уведомления
          </div>
          <div className="menu-left__item">
            Проекты
            <span
              className="menu-left__add-button"
              onClick={onAddProject}
            >
              +
            </span>
          </div>
          <ul className="projects-list">
            <li key="add" className="list-item projects-list__item">
              {addForm}
            </li>
            {listProjects}
          </ul>
          <div className="menu-left__bottom-bar">
            <span className="menu-left__bottom-bar-icon" />
          </div>
        </div>
      </div>
    );
  }
};

export default MenuLeft;
