import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeInnerGroupsSelector } from '../../selectors';

import MenuLeftItem from './menu-left-item';

class MenuLeftItemContainer extends Component {
  constructor() {
    super();
    this.state = {
      showProjectMenu: false,
      addGroupForm: false,
    };
    this.onToggleProjectMenu = this.onToggleProjectMenu.bind(this);
    this.onCloseProjectMenu = this.onCloseProjectMenu.bind(this);
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
    const {
      showProjectMenu,
      addGroupForm,
    } = this.state;
    return (
      <MenuLeftItem
        level={level}
        maxLevel={maxLevel}
        group={group}
        groups={groups}
        history={history}
        showProjectMenu={showProjectMenu}
        addGroupForm={addGroupForm}
        onToggleProjectMenu={this.onToggleProjectMenu}
        onShowAddGroupForm={this.onShowAddGroupForm}
        onCloseAddGroupForm={this.onCloseAddGroupForm}
        addGroup={this.addGroup}

      />
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

const ConnectedMenuLeftItem = connect(makeMapStateToProps)(withRouter(MenuLeftItemContainer));

export default ConnectedMenuLeftItem;
