import React, { Component } from 'react';

import AddButton from '../add-button';
import AddGroupForm from '../add-group-form';
import TaskItem from '../task-item';
import DoneCheckbox from '../done-checkbox';
import ConnectedGroupItem from './group-item-container';

import './group-item.sass';

class GroupItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  onToggleOpen() {
    this.setState((state) => {
      return { open: !state.open };
    });
  }

  render() {
    const {
      group,
      tasks,
      groups,
      history,
      activeGroup,
      onToggleActive,
      addNewTask,
      addNewGroup,
      showTaskEditor,
      showAddForm,
      onAddTask,
      onAddGroup,
      onSubmitGroup,
      handleCheckbox,
      closeAddForm,
      onGroupClick,
    } = this.props;
    const { open } = this.state;
    let { level } = this.props;
    const active = activeGroup === group.id;
    let classNameOpenIcon = open ? 'group__label-icon_open' : '';
    const labelClassNames = active ? 'group__label group__label_active' : 'group__label';
    let groupList = null;
    let taskList = null;
    let nexFloor = null;
    let levelToClass = level;
    if (open) {
      if (level > 9 && (level % 10) === 0) {
        nexFloor = 'next-floor';
        level = 0;
        levelToClass = 0;
      }
      if (groups.length > 0) {
        level++;
        groupList = groups.map( (group) => {
          return (
            <div key={group.id}>
              <ConnectedGroupItem
                group={group}
                activeGroup={activeGroup}
                addNewGroup={addNewGroup}
                onToggleActive={onToggleActive}
                addNewTask={addNewTask}
                showTaskEditor={showTaskEditor}
                level={level} history={history}
              />
            </div>
          );
        });
      }
      if (tasks.length > 0) {
        taskList = tasks.map( (task) => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              showTaskEditor={showTaskEditor}
            />
          );
        });
      }
    }
    const icon = ((groups.length < 1) && (tasks.length < 1))
      ? null
      : (
        <span
          className={`group__label-icon group__label-icon_level-${ levelToClass } ${ classNameOpenIcon }`}
          onClick={this.onToggleOpen}
        />
      );
    const buttons = !active
      ? null
      : (
        <div className="buttons-wrapper">
          <AddButton
            label="task"
            onAdd={onAddTask}
          />
          <AddButton
            label="group"
            onAdd={onAddGroup}
          />
        </div>
      );
    const checkbox = !active
      ? null
      : (
        <DoneCheckbox
          done={group.done}
          handleCheckbox={handleCheckbox}
        />
      );
    let addForm = null;
    if (showAddForm) {
      addForm = (
        <AddGroupForm
          project={false}
          addNewItem={onSubmitGroup}
          onCloseForm={closeAddForm}
        />
      );
    }
    const itemOpenClassName = !open ? '' : 'group_open';
    return (
      <li className={`group item-list__group ${ itemOpenClassName } ${ nexFloor }`}
        key={group.id.toString()}
      >
        <div className={labelClassNames}>
          {icon}
          {checkbox}
          <span
            className="group__label-name"
            onClick={onGroupClick}
          >
            {group.label}
          </span>
          {buttons}
          {addForm}
        </div>
        <ul>
          {taskList}
          {groupList}
        </ul>
      </li>
    );
  }
}

export default GroupItem;
