import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  makeTaskTagsSelector,
  getAllTagsSelector,
  usersSelector,
  makeTaskCommentsSelector,
} from '../../selectors';

import ChangeTaskForm from './change-task-form';

class ChangeTaskFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagFormVisible: false,
      historyVisible: false,
      assignedFormVisible: false,
    };
    this.onCloseTagForm = this.onCloseTagForm.bind(this);
    this.onShowTagForm = this.onShowTagForm.bind(this);
    this.onCloseAssignedForm = this.onCloseAssignedForm.bind(this);
    this.onShowAssignedForm = this.onShowAssignedForm.bind(this);
    this.onToggleShowedHistory = this.onToggleShowedHistory.bind(this);
    this.onShowedFiles = this.onShowedFiles.bind(this);
    this.onAddTag = this.onAddTag.bind(this);
    this.onUpdateTaskAddTag = this.onUpdateTaskAddTag.bind(this);
    this.updateTaskAddAssigned = this.updateTaskAddAssigned.bind(this);
    this.updateTaskDeleteAssigned = this.updateTaskDeleteAssigned.bind(this);
    this.dateTimePickerTrigger = this.dateTimePickerTrigger.bind(this);
  }

  onShowTagForm() {
    this.setState({ tagFormVisible: true });
  }

  onCloseTagForm() {
    this.setState({ tagFormVisible: false });
  }

  onAddTag(label, color) {
    this.props.addTag(label, color);
    this.onCloseTagForm();
  }

  onUpdateTaskAddTag(tagId) {
    this.props.updateTaskAddTag(tagId);
    this.onCloseTagForm();
  }

  onShowAssignedForm() {
    this.setState({ assignedFormVisible: true });
  }

  onCloseAssignedForm() {
    this.setState({ assignedFormVisible: false });
  }

  onToggleShowedHistory() {
    this.setState((state) => {
      return { historyVisible: !state.historyVisible };
    });
  }

  onShowedFiles () {
    this.setState({ filesListVisible: true });
  }

  updateTaskAddAssigned(userId) {
    this.props.updateTaskAddAssigned(userId);
    this.onCloseAssignedForm();
  }

  updateTaskDeleteAssigned(userId) {
    this.props.updateTaskDeleteAssigned(userId);
    this.onCloseAssignedForm();
  }

  dateTimePickerTrigger() {
    document.getElementsByClassName('form-control')[0].click();
  }

  componentDidUpdate(prevProps) {
    if (this.props.task.id !== prevProps.task.id) {
      this.setState({ historyVisible: false });
    }
  }

  render() {
    const {
      task,
      assigned,
      user,
      users,
      taskTags,
      allTags,
      deleteTag,
      changeStatus,
      comments,
      addComment,
      updateCommentDeleteFile,
    } = this.props;
    const {
      tagFormVisible,
      historyVisible,
      assignedFormVisible,
    } = this.state;
    return (
      <ChangeTaskForm
        task={task}
        assigned={assigned}
        user={user}
        users={users}
        taskTags={taskTags}
        allTags={allTags}
        deleteTag={deleteTag}
        changeStatus={changeStatus}
        comments={comments}
        addComment={addComment}
        updateCommentDeleteFile={updateCommentDeleteFile}
        tagFormVisible={tagFormVisible}
        historyVisible={historyVisible}
        assignedFormVisible={assignedFormVisible}
        onAddTag={this.onAddTag}
        onCloseTagForm={this.onCloseTagForm}
        onShowTagForm={this.onShowTagForm}
        onShowAssignedForm={this.onShowAssignedForm}
        onCloseAssignedForm={this.onCloseAssignedForm}
        onUpdateTaskAddTag={this.onUpdateTaskAddTag}
        updateTaskAddAssigned={this.updateTaskAddAssigned}
        updateTaskDeleteAssigned={this.updateTaskDeleteAssigned}
        updateTaskAddDateDue={this.props.updateTaskAddDateDue}
        onToggleShowedHistory={this.onToggleShowedHistory}
        dateTimePickerTrigger={this.dateTimePickerTrigger}

      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const taskTagsSelector = makeTaskTagsSelector();
  const taskCommentsSelector = makeTaskCommentsSelector();
  return {
    taskTags: taskTagsSelector(state, props),
    allTags: getAllTagsSelector(state, props),
    users: usersSelector(state),
    comments: taskCommentsSelector(state, props),
  };
};

export default connect(mapStateToProps)(ChangeTaskFormContainer);
