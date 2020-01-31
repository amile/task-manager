import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateTaskSetDone } from '../../actions';
import {
  makeTaskAssignedUsersSelector,
  makeTaskTagsSelector,
} from '../../selectors';
import {
  formatStatus,
  getCalendarDate,
  getTime,
} from '../../utils';

import DoneCheckbox from '../done-checkbox';
import TagItem from '../tag-item';

import './task-item.sass';


class TaskItem extends Component {
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
    const userIconClassNames = (assigned && (assigned.length >= 3)) ? 'user-icon_align' : '';
    const assignedList = (!assigned)
      ? null
      : assigned.slice(0, 3).map((user) => {
        return (
          <li
            key={user.id}
            className={`user-icon task-item__user-icon ${ userIconClassNames }`}
          >
            {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
          </li>
        );
      });
    const restUsers = (!assigned || (assigned.length < 4))
      ? null
      : (
        <li
          key="rest"
          className="user-icon user-icon_rest task-item__user-icon"
        >
          +{assigned.length - 3}
        </li>
      );
    const tagList = (!tags)
      ? null
      : tags.map((tag) => {
        return (
          <TagItem
            key={tag.id}
            tag={tag}
          />
        );
      });
    const comments = (!task.comments || (task.comments.length === 0))
      ? null
      : <span className="task-item__comments">{task.comments.length}</span>;
    const dateDue = (!task.dateDue)
      ? null
      : (
        <div className="task-item__date">
          {getCalendarDate(task.dateDue)}
          <span className="task-item__date-time">
            {getTime(task.dateDue)}
          </span>
        </div>
      );
    return (
      <li
        className="item-list__task task-item"
        onClick={this.onShowTaskEditor}
      >
        <div className="task-item__label">
          <DoneCheckbox
            done={task.done}
            handleCheckbox={this.handleCheckbox}
          />
          <div className="task-item__label-name">
            {task.label}
            {comments}
            {tagList}
          </div>
        </div>
        <div className={`task-item__status status_${ task.status }`}>
          {formatStatus(task.status)}
        </div>
        <ul className="task-item__assigned">
          {assignedList}
          {restUsers}
        </ul>
        {dateDue}
      </li>
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

export const ConnectTaskItem = connect(makeMapStateToProps, mapDispatchToProps)(TaskItem);

export default ConnectTaskItem;
