import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProjectMenu from '../project-menu';
import AddGroupForm from '../add-group-form';
import ConnectedMenuLeftItem from './menu-left-item-container';

class MenuLeftItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.onToggleActive = this.onToggleActive.bind(this);
  }

  onToggleActive() {
    if ((this.props.level < this.props.maxLevel)
      && (this.props.groups.length > 0)) {
      this.setState((state) => {
        return { open: !state.open };
      });
    }
  }

  render() {
    let {
      level,
      maxLevel,
      group,
      groups,
      history,
      addGroup,
      showProjectMenu,
      addGroupForm,
      onToggleProjectMenu,
      onShowAddGroupForm,
      onCloseAddGroupForm,
    } = this.props;
    const pathName = history ? history.location.pathname.split('/') : null;
    const showedGroupId = (pathName && (pathName.length > 3)) ? pathName[3] : '';
    let iconClassNames = (this.state.open) ? 'icon active' : 'icon';
    let menuIconClassNames = (!showProjectMenu)
      ? 'projects-list__menu-icon'
      : 'projects-list__menu-icon projects-list__menu-icon_close';
    const icon = (groups.length > 0)
      ? <span className={iconClassNames} onClick={this.onToggleActive} />
      : null;
    const menuIcon = !group.parentId
      ? (
        <span
          className={menuIconClassNames}
          onClick={onToggleProjectMenu}
        >
          +
        </span>
      )
      : null;
    const projectMenu = !showProjectMenu
      ? null
      : <ProjectMenu addGroup={onShowAddGroupForm} />;
    let labelClassNames = !group.parentId
      ? 'projects-list__item-label_project'
      : '';
    labelClassNames = (showedGroupId === group.id)
      ? (labelClassNames + ' showed')
      : labelClassNames;
    let listItems = null;
    const listItemsClassNames = (groups.length === 0) ? 'last' : null;
    const addGroupFormItem = !addGroupForm
      ? null
      : (
        <AddGroupForm
          onCloseForm={onCloseAddGroupForm}
          addNewItem={addGroup}
        />
      );
    if (this.state.open && (level < maxLevel)) {
      level++;
      listItems = (
        <ul className={listItemsClassNames}>
          {groups.map((item) => {
            return (
              <li key={item.id}
                className="list-item projects-list__item"
              >
                <ConnectedMenuLeftItem
                  group={item}
                  level={level}
                  maxLevel={maxLevel}
                />
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div>
        <div className={`projects-list__item-label ${ labelClassNames }`}>
          {icon}
          {menuIcon}
          <Link to={`/app/group/${ group.id }`}>
            <span className="projects-list__item-label-name">
              {group.label}
            </span>
          </Link>
          {projectMenu}
        </div>
        {addGroupFormItem}
        {listItems}
      </div>
    );
  }
}

export default MenuLeftItem;
