import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';

import {
  showedTaskSelector,
  taskCreatedByUserSelector,
  currentUserSelector,
  makeTaskAssignedUsersSelector,
} from '../../selectors';

import {
  addTask,
  addTag,
  addComment,
  updateTaskAddTag,
  updateTaskDeleteTag,
  updateTaskChangeStatus,
  updateTaskAddAssigned,
  updateTaskDeleteAssigned,
  updateTaskAddDateDue,
  updateCommentDeleteFile,
} from '../../actions';

import { createNewIndex } from '../../utils';

import CreateTaskForm from '../create-task-form';
import ChangeTaskForm from '../change-task-form';
import Breadcrumbs from '../breadcrumbs';

import './task-form.sass';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      close: false,
      show: false,
    };
    this.onClose = this.onClose.bind(this);
    this.addTag = this.addTag.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.addComment = this.addComment.bind(this);
    this.updateTaskAddTag = this.updateTaskAddTag.bind(this);
    this.updateTaskAddDateDue = this.updateTaskAddDateDue.bind(this);
    this.updateTaskDeleteTag = this.updateTaskDeleteTag.bind(this);
    this.updateTaskChangeStatus = this.updateTaskChangeStatus.bind(this);
    this.updateTaskAddAssigned = this.updateTaskAddAssigned.bind(this);
    this.updateTaskDeleteAssigned = this.updateTaskDeleteAssigned.bind(this);
    this.updateCommentDeleteFile = this.updateCommentDeleteFile.bind(this);
  }

  onClose() {
    const path = `/app/group/${ this.props.match.params.groupId }`;
    this.setState({ close: true, show: false });
    setTimeout(() => {this.props.history.push(`${ path }`);}, 1000);
  }

  addTag(label, color) {
    const id = createNewIndex();
    this.props.addTag(this.props.itemId, { label, color, id });
    this.props.updateTaskAddTag(this.props.itemId, id);
  }

  updateTaskAddTag(tagId) {
    this.props.updateTaskAddTag(this.props.itemId, tagId);
  }

  addNewItem(e) {
    const { groupId, currentUser, history, match } = this.props;
    const path = `/app/group/${ match.params.groupId }`;
    this.props.addTask(e, groupId, currentUser, history, path);
  }

  updateTaskAddDateDue(date) {
    const { itemId, currentUser } = this.props;
    this.props.updateTaskAddDateDue(itemId, date, currentUser);
  }

  updateTaskDeleteTag(tagId) {
    this.props.updateTaskDeleteTag(this.props.itemId, tagId);
  }

  updateTaskChangeStatus(status) {
    const { itemId, currentUser } = this.props;
    this.props.updateTaskChangeStatus(itemId, status, currentUser);
  }

  updateTaskAddAssigned(assignedUser) {
    const { itemId, currentUser } = this.props;
    this.props.updateTaskAddAssigned(itemId, assignedUser, currentUser);
  }

  updateTaskDeleteAssigned(user) {
    const { itemId, currentUser } = this.props;
    this.props.updateTaskDeleteAssigned(itemId, user, currentUser);
  }

  addComment(label, files) {
    const { itemId, currentUser } = this.props;
    this.props.addComment(itemId, label, files, currentUser);
  }

  updateCommentDeleteFile(commentId, fileId) {
    this.props.updateCommentDeleteFile(commentId, fileId);
  }

  componentDidMount() {
    if (this.props.currentUser) {
      setTimeout(() => {this.setState({ show: true });}, 1000);
    }
  }

  render() {
    const {
      itemId,
      task,
      user,
      assigned,
      currentUser,
    } = this.props;
    if (!task && itemId !== 'new') {
      return null;
    } else if (!currentUser) {
      return <Redirect to="/login" />;
    }
    const content = (itemId === 'new')
      ? (
        <CreateTaskForm
          addNewItem={this.addNewItem}
          onClose={this.onClose}
        />
      )
      : (
        <ChangeTaskForm
          task={task}
          user={user}
          assigned={assigned}
          addTag={this.addTag}
          addComment={this.addComment}
          updateTaskAddTag={this.updateTaskAddTag}
          deleteTag={this.updateTaskDeleteTag}
          changeStatus={this.updateTaskChangeStatus}
          updateTaskAddAssigned={this.updateTaskAddAssigned}
          updateTaskDeleteAssigned={this.updateTaskDeleteAssigned}
          updateTaskAddDateDue={this.updateTaskAddDateDue}
          updateCommentDeleteFile={this.updateCommentDeleteFile}
        />
      );
    let classNames = this.state.close ? 'task-form_close' : '';
    const breadcrumbs = (itemId === 'new') ? null : <Breadcrumbs child={task} />;
    if (this.state.show) { classNames = 'task-form_show'; }
    return (
      <div className={`task-form ${ classNames }`}>
        <div className="task-form__top-bar">
          <span
            className="task-form__close-icon"
            onClick={this.onClose}
          />
          <div className="breadcrumbs-wrapper">
            {breadcrumbs}
          </div>
        </div>
        {content}
      </div>
    );
  }
}
const makeMapStateToProps = () => {
  const taskAssignedUsersSelector = makeTaskAssignedUsersSelector();
  const mapStateToProps = (state, props) => {
    let task, user, assigned = null;
    if (!isNaN(props.itemId)) {
      task = showedTaskSelector(state, props);
      user = taskCreatedByUserSelector(state, props);
      assigned = taskAssignedUsersSelector(state, props);
    }
    return {
      task,
      user,
      assigned,
      currentUser: currentUserSelector(state),

    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: bindActionCreators(addTask, dispatch),
    addTag: bindActionCreators(addTag, dispatch),
    updateTaskAddTag: bindActionCreators(updateTaskAddTag, dispatch),
    updateTaskDeleteTag: bindActionCreators(updateTaskDeleteTag, dispatch),
    updateTaskChangeStatus: bindActionCreators(updateTaskChangeStatus, dispatch),
    updateTaskAddDateDue: bindActionCreators(updateTaskAddDateDue, dispatch),
    updateTaskAddAssigned: bindActionCreators(updateTaskAddAssigned, dispatch),
    updateTaskDeleteAssigned: bindActionCreators(updateTaskDeleteAssigned, dispatch),
    addComment: bindActionCreators(addComment, dispatch),
    updateCommentDeleteFile: bindActionCreators(updateCommentDeleteFile, dispatch),
  };
};

export default connect(makeMapStateToProps, mapDispatchToProps)(withRouter(TaskForm));
