import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  makeInnerTasksSelector,
  makeInnerGroupsSelector,
} from '../../selectors';
import { updateGroupSetDone } from '../../actions';

import GroupItem from './group-item';

export class GroupItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddForm: false,
    };
    this.onAddTask = this.onAddTask.bind(this);
    this.onGroupClick = this.onGroupClick.bind(this);
    this.onAddGroup = this.onAddGroup.bind(this);
    this.closeAddForm = this.closeAddForm.bind(this);
    this.onSubmitGroup = this.onSubmitGroup.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  onAddTask() {
    this.props.addNewTask(this.props.group.id);
  }

  onAddGroup() {
    this.setState({ showAddForm: true });
  }

  onGroupClick() {
    this.props.onToggleActive(this.props.group.id);
  }

  closeAddForm() {
    this.setState({ showAddForm: false });
  }

  onSubmitGroup(value) {
    this.closeAddForm();
    this.props.addNewGroup(value, this.props.group.id);
  }

  handleCheckbox(done) {
    const { id } = this.props.group;
    this.props.updateGroupSetDone(id, done );
  }

  render() {
    const {
      group,
      tasks,
      groups,
      history,
      level,
      activeGroup,
      onToggleActive,
      addNewTask,
      addNewGroup,
      showTaskEditor,
    } = this.props;
    return (
      <GroupItem
        group={group}
        tasks={tasks}
        groups={groups}
        history={history}
        level={level}
        activeGroup={activeGroup}
        onToggleActive={onToggleActive}
        addNewTask={addNewTask}
        addNewGroup={addNewGroup}
        showTaskEditor={showTaskEditor}
        onAddTask={this.onAddTask}
        onAddGroup={this.onAddGroup}
        onSubmitGroup={this.onSubmitGroup}
        showAddForm={this.state.showAddForm}
        handleCheckbox={this.handleCheckbox}
        closeAddForm={this.closeAddForm}
        onGroupClick={this.onGroupClick}
      />
    );
  }
}

const makeMapStateToProps = () => {
  const innerTasksSelector = makeInnerTasksSelector();
  const innerGroupsSelector = makeInnerGroupsSelector();
  const mapStateToProps = (state, props) => {
    return {
      tasks: innerTasksSelector(state, props),
      groups: innerGroupsSelector(state, props),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateGroupSetDone: bindActionCreators(updateGroupSetDone, dispatch),
  };
};

const ConnectedGroupItem = connect(makeMapStateToProps, mapDispatchToProps)(GroupItemContainer);

export default ConnectedGroupItem;
