import React, { Component } from 'react';

import * as moment from 'moment';
import 'moment/locale/ru';

import CommentItem from '../comment-item';
import CommentForm from '../comment-form';
import StatusForm from '../status-form';
import DateTimePicker from '../date-time-picker';
import AddAssignedForm from '../add-assigned-form';
import AddTagForm from '../add-tag-form';
import TagItem from '../tag-item';

import './change-task-form.sass';

const maxAssignedInlineShowed = 3;

class ChangeTaskForm extends Component {
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
      tagFormVisible,
      historyVisible,
      assignedFormVisible,
      onAddTag,
      onShowTagForm,
      onCloseTagForm,
      onShowAssignedForm,
      onCloseAssignedForm,
      onToggleShowedHistory,
      onUpdateTaskAddTag,
      updateTaskAddAssigned,
      updateTaskDeleteAssigned,
      updateTaskAddDateDue,
      updateCommentDeleteFile,
      dateTimePickerTrigger,
    } = this.props;
    console.log(onShowTagForm);
    const addTagForm = !tagFormVisible
      ? null
      : (
        <AddTagForm
          taskTags={taskTags}
          tags={allTags}
          onClose={onCloseTagForm}
          addTag={onAddTag}
          updateTaskAddTag={onUpdateTaskAddTag}
        />
      );
    const tagsList = (!taskTags)
      ? null
      : (
        taskTags.map((tag) => {
          return (
            <TagItem
              key={tag.id}
              tag={tag}
              onDelete={deleteTag}
            />
          );
        })
      );
    const addAssignedForm = !assignedFormVisible
      ? null
      : (
        <AddAssignedForm
          users={users}
          assigned={assigned}
          onClose={onCloseAssignedForm}
          updateTaskAddAssigned={updateTaskAddAssigned}
          updateTaskDeleteAssigned={updateTaskDeleteAssigned}
        />
      );
    let assignedRest = null;
    let assignedUsersClassNames = 'task-form__assigned-item user-icon';
    if (assigned && (assigned.length > maxAssignedInlineShowed)) {
      assignedRest = (
        <li key={user.id}
          className="task-form__assigned-item user-icon user-icon_rest"
        >
          + {assigned.length - maxAssignedInlineShowed}
        </li>
      );
      assignedUsersClassNames += ' task-form__assigned-item_align';
    }
    const assignedUsers = !assigned
      ? null
      : assigned.slice(0, maxAssignedInlineShowed).map((user) => {
        return (
          <li
            key={user.id}
            className={assignedUsersClassNames}
          >
            {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
          </li>
        );
      });
    const history = !historyVisible
      ? null
      : task.history.map((item, idx) => {
        return (
          <li key={idx}
            className="history__item"
          >
            <span className="history__item-date">
              {moment(item.date).format('DD MMMM YYYY, H:mm')}
            </span>
            <span className="history__item-user">
              {item.user}
            </span>
            {item.label}
          </li>
        );
      });
    const activeMenuHistory = !historyVisible ? '' : 'active';
    const listComments = !comments
      ? <li className="task-form__title list__item">Комментариев нет</li>
      : comments.map((comment) => {
        return (
          <li key={comment.id} className="comment list__item">
            <CommentItem
              comment={comment}
              updateCommentDeleteFile={updateCommentDeleteFile}
            />
          </li>
        );
      });
    return (
      <div className="task-form__body">
        <section className="task-form__task-info">
          <div className="task-form__container">
            <div className="task-form__created-info">
              <div className="task-form__created-by">
                {`${ user.lastName } ${ user.firstName.slice(0, 1) }.`}
              </div>
              <div className="task-form__created-date">
                {moment(task.dateCreated).format('DD MMMM YYYY, HH:mm')}
              </div>
            </div>
            <div className="task-form__label">{task.label}</div>
            <div className="task-form__tags-wrapper">
              {tagsList}
              {addTagForm}
              <div
                className="tag tag_add"
                onClick={onShowTagForm}
              >
                +
              </div>
            </div>
            <div className="task-form__status-info">
              <div className="task-form__status">
                <StatusForm
                  status={task.status}
                  changeStatus={changeStatus}
                />
              </div>
              <div className="task-form__date-due">
                <span className="date-due__calendar-icon"
                  onClick={dateTimePickerTrigger}
                />
                <DateTimePicker
                  value={task.dateDue}
                  updateTaskAddDateDue={updateTaskAddDateDue}
                />
              </div>
              <ul className="task-form__assigned-list">
                {assignedUsers}
                {assignedRest}
                <li key="add"
                  className="user-icon task-form__assigned-item task-form__assigned-item_add"
                  onClick={onShowAssignedForm}
                >+
                </li>
                {addAssignedForm}
              </ul>
            </div>
          </div>
        </section>
        <section className="task-form__discussion">
          <div className="task-form__container">
            <ul className="history">
              {history}
            </ul>
          </div>
          <div className="task-form__container">
            <ul className="list comment-list">
              {listComments}
            </ul>
          </div>
        </section>
        <section className="task-form__comment-editor">
          <div className="task-form__container">
            <CommentForm addComment={addComment} />
          </div>
        </section>
        <section className="task-form__bottom-menu">
          <div className="task-form__container bottom-menu__container">
            <div className="bottom-menu__item" >
              <span className="bottom-menu__item-icon bottom-menu__item-icon_files" />
                Файлы
            </div>
            <div
              className={`bottom-menu__item bottom-menu__item_history ${ activeMenuHistory }`}
              onClick={onToggleShowedHistory}
            >
              <span className="bottom-menu__item-icon bottom-menu__item-icon_history" />
                История
            </div>
            <div className="bottom-menu__item bottom-menu__item_menu">
              <span className="bottom-menu__item-icon bottom-menu__item-icon_menu" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ChangeTaskForm;
