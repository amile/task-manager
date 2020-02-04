import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateTaskSetDone } from '../../actions';
import {
  makeTaskAssignedUsersSelector,
  makeTaskTagsSelector,
} from '../../selectors';

import TaskItem from './task-item';

class TaskItemContainer extends Component {
  constructor(props) {
    super(props);
    this.onShowTaskEditor = this.onShowTaskEditor.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(done) {
    const { id } = this.props.task;
    this.props.updateTaskSetDone(id, done );
  }

  onShowTaskEditor() {
    this.props.showTaskEditor(this.props.task.id);
  }

  render() {
    const { task, assigned, tags } = this.props;
    return (
      <TaskItem
        task={task}
        assigned={assigned}
        tags={tags}
        handleCheckbox={this.handleCheckbox}
        onShowTaskEditor={this.onShowTaskEditor}
      />
    );
  }
}

const makeMapStateToProps = () => {
  const taskAssignedUsersSelector = makeTaskAssignedUsersSelector();
  const taskTagsSelector = makeTaskTagsSelector();
  const mapStateToProps = (state, props) => {
    return {
      assigned: taskAssignedUsersSelector(state, {itemId: props.task.id}),
      tags: taskTagsSelector(state, props),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTaskSetDone: bindActionCreators(updateTaskSetDone, dispatch),
  };
};

export const ConnectedTaskItem = connect(makeMapStateToProps, mapDispatchToProps)(TaskItemContainer);

export default ConnectedTaskItem;
