import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import 'moment/locale/ru';

import { makeTaskTagsSelector, getAllTagsSelector, usersSelector,
  makeTaskCommentsSelector } from '../../selectors';

import CommentItem from '../comment-item/comment-item';
import CommentForm from '../comment-form/comment-form';
import StatusForm from '../status-form/status-form';
import DateTimePicker from '../date-time-picker/date-time-picker';
import AddAssignedForm from '../add-assigned-form/add-assigned-form';
import AddTagForm from '../add-tag-form/add-tag-form';

import './change-task-form.sass';

const maxAssignedInlineShowed = 3;

class ChangeTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagFormVisible: false,
      assignedFormVisible: false,
      historyVisible: false,
      filesListVisible: false
    };
    this.onCloseTagForm = () => {
      this.setState({ tagFormVisible: false });
    };
    this.onShowTagForm = () => {
      this.setState({ tagFormVisible: true });
    };
    this.onCloseAssignedForm = () => {
      this.setState({ assignedFormVisible: false });
    };
    this.onShowAssignedForm = () => {
      this.setState({ assignedFormVisible: true });
    };
    this.onToggleShowedHistory = () => {
      this.setState((state) => {
        return { historyVisible: !state.historyVisible };
      });
    };
    this.onShowedFiles = () => {
      this.setState({ filesListVisible: true });
    };
    this.onAddTag = (label, color) => {
      this.props.addTag(label, color);
      this.onCloseTagForm();
    };
    this.onUpdateTaskAddTag = (tagId) => {
      this.props.updateTaskAddTag(tagId);
      this.onCloseTagForm();
    };
    this.updateTaskAddAssigned = (userId) => {
      this.props.updateTaskAddAssigned(userId);
      this.onCloseAssignedForm();
    };
    this.updateTaskDeleteAssigned = (userId) => {
      this.props.updateTaskDeleteAssigned(userId);
      this.onCloseAssignedForm();
    };
    this.dateTimePickerTrigger = () => {
      document.getElementsByClassName('form-control')[0].click();
    };
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
      files } = this.props;
    const addTagForm = !this.state.tagFormVisible
      ? null
      : (
        <AddTagForm
          taskTags={taskTags}
          tags={allTags}
          onClose={this.onCloseTagForm}
          addTag={this.onAddTag}
          updateTaskAddTag={this.onUpdateTaskAddTag}
        />
      );
    const tagsList = (!taskTags)
      ? null
      : taskTags.map((tag) => {
        const tagClassNames = 'tag_' + tag.color;
        return (
          <div key={tag.id}
            className={'task-form__tag-item tag ' + tagClassNames}
          >
            {tag.label}
            <span className="task-form__tag-item-delete"
              onClick={() => { deleteTag(tag.id); }}
            >
              +
            </span>
          </div>
        );
      });
    const addAssignedForm = !this.state.assignedFormVisible
      ? null
      : (
        <AddAssignedForm
          users={users}
          assigned={assigned}
          onClose={this.onCloseAssignedForm}
          updateTaskAddAssigned={this.updateTaskAddAssigned}
          updateTaskDeleteAssigned={this.updateTaskDeleteAssigned}
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
          <li key={user.id} className={assignedUsersClassNames}>
            {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
          </li>
        );
      });
    const history = !this.state.historyVisible
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
    const activeMenuHistory = !this.state.historyVisible ? '' : 'active';
    let filesListContent, filesListTitle = null;
    if (this.state.filesListVisible) {
      filesListTitle = (<h3 className="task-form__title">Файлы</h3>);
      filesListContent = !files
        ? null
        : files.map((file, idx) => {
          return (
            <li key={idx} className="file-list__item file-label">
              <a className="file-label-link"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.name}
              </a>
              <a className="file-label-download"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                download={file.name}
              >
                Загрузить
              </a>
              <span className="btn_delete file-btn_delete"
                onClick={() => {this.handleDeleteFile(file.name);}}
              >
                +
              </span>
            </li>
          );
        });
    }
    const listComments = !comments
      ? (<li className="task-form__title list__item">Комментариев нет</li>)
      : comments.map((comment) => {
        return (
          <li key={comment.id} className="comment list__item">
            <CommentItem comment={comment} updateCommentDeleteFile={this.props.updateCommentDeleteFile}/>
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
              <div className="tag task-form__tag-item task-form__tag-item_add" onClick={this.onShowTagForm}>+</div>
            </div>
            <div className="task-form__status-info">
              <div className="task-form__status">
                <StatusForm
                  status={task.status}
                  changeStatus={changeStatus}
                />
              </div>
              <div className="task-form__date-due">
                <span className="date-due__calendar-icon" onClick={this.dateTimePickerTrigger} />
                <DateTimePicker
                  value={task.dateDue}
                  updateTaskAddDateDue={this.props.updateTaskAddDateDue}
                />
              </div>
              <ul className="task-form__assigned-list">
                {assignedUsers}
                {assignedRest}
                <li key="add"
                  className="user-icon task-form__assigned-item task-form__assigned-item_add"
                  onClick={this.onShowAssignedForm}
                >+
                </li>
                {addAssignedForm}
              </ul>
            </div>
          </div>
        </section>
        <section className="task-form__files">
          <div className="task-form__container">
            {filesListTitle}
            <ul className="files task-form__files">
              {filesListContent}
            </ul>
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
            <CommentForm addComment={this.props.addComment} />
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
              onClick={this.onToggleShowedHistory}
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

const mapStateToProps = (state, props) => {
  const taskTagsSelector = makeTaskTagsSelector();
  const taskCommentsSelector = makeTaskCommentsSelector();
  return {
    taskTags: taskTagsSelector(state, props),
    allTags: getAllTagsSelector(state, props),
    users: usersSelector(state),
    comments: taskCommentsSelector(state, props)
  };
};

export default connect(mapStateToProps)(ChangeTaskForm);
