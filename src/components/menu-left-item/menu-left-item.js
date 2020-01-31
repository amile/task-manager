import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeInnerGroupsSelector } from '../../selectors';

import ProjectMenu from '../project-menu';
import AddGroupForm from '../add-group-form';

class MenuLeftItem extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      showProjectMenu: false,
      addGroupForm: false,
    };
    this.onToggleProjectMenu = this.onToggleProjectMenu.bind(this);
    this.onCloseProjectMenu = this.onCloseProjectMenu.bind(this);
    this.onToggleActive = this.onToggleActive.bind(this);
    this.onShowAddGroupForm = this.onShowAddGroupForm.bind(this);
    this.onCloseAddGroupForm = this.onCloseAddGroupForm.bind(this);
    this.addGroup = this.addGroup.bind(this);
  }

  onToggleProjectMenu(e) {
    e.stopPropagation();
    this.setState((state) => {
      return { showProjectMenu: !state.showProjectMenu };
    });
  }

  onCloseProjectMenu() {
    this.setState({ showProjectMenu: false });
  }

  onToggleActive() {
    if ((this.props.level < this.props.maxLevel)
      && (this.props.groups.length > 0)) {
      this.setState((state) => {
        return { open: !state.open };
      });
    }
  }

  onShowAddGroupForm() {
    this.setState({
      addGroupForm: true,
      showProjectMenu: false,
    });
  }

  onCloseAddGroupForm() {
    this.setState({
      addGroupForm: false,
    });
  }

  addGroup(label) {
    if (label.length > 0) {
      this.props.addGroup(label, this.props.group.id);
    }
    this.onCloseAddGroupForm();
  }

  render() {
    let {
      level,
      maxLevel,
      group,
      groups,
      history,
    } = this.props;
    const pathName = history ? history.location.pathname.split('/') : null;
    const showedGroupId = (pathName && (pathName.length > 3)) ? pathName[3] : '';
    let iconClassNames = (this.state.open) ? 'icon active' : 'icon';
    let menuIconClassNames = (!this.state.showProjectMenu)
      ? 'projects-list__menu-icon'
      : 'projects-list__menu-icon projects-list__menu-icon_close';
    const icon = (groups.length > 0)
      ? <span className={iconClassNames} onClick={this.onToggleActive} />
      : null;
    const menuIcon = !group.parentId
      ? (
        <span
          className={menuIconClassNames}
          onClick={this.onToggleProjectMenu}
        >
          +
        </span>
      )
      : null;
    const projectMenu = !this.state.showProjectMenu
      ? null
      : <ProjectMenu addGroup={this.onShowAddGroupForm} />;
    let labelClassNames = !group.parentId
      ? 'projects-list__item-label_project'
      : '';
    labelClassNames = (showedGroupId === group.id)
      ? (labelClassNames + ' showed')
      : labelClassNames;
    let listItems = null;
    const listItemsClassNames = (groups.length === 0) ? 'last' : null;
    const addGroupForm = !this.state.addGroupForm
      ? null
      : (
        <AddGroupForm
          onCloseForm={this.onCloseAddGroupForm}
          addNewItem={this.addGroup}
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
        {addGroupForm}
        {listItems}
      </div>
    );
  }
}

const makeMapStateToProps = () => {
  const innerGroupsSelector = makeInnerGroupsSelector();
  const mapStateToProps = (state, props) => {
    return {
      groups: innerGroupsSelector(state, props),
    };
  };
  return mapStateToProps;
};

const ConnectedMenuLeftItem = connect(makeMapStateToProps)(withRouter(MenuLeftItem));

export default ConnectedMenuLeftItem;
