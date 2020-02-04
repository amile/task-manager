import React from 'react';

import {
  formatStatus,
  getCalendarDate,
  getTime,
} from '../../utils';

import DoneCheckbox from '../done-checkbox';
import TagItem from '../tag-item';

import './task-item.sass';

const TaskItem = ({
  task,
  assigned,
  tags,
  handleCheckbox,
  onShowTaskEditor,
}) => {
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
      onClick={onShowTaskEditor}
    >
      <div className="task-item__label">
        <DoneCheckbox
          done={task.done}
          handleCheckbox={handleCheckbox}
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
};

export default TaskItem;
