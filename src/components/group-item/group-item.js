import React, { Component } from 'react';

import './group-item.sass';
import AddButton from '../add-button/add-button';
import AddForm from '../add-form/add-form';

export default class GroupItem extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            active: false,
            addNewGroup: false,
            addNewTask: false
        }
        this.onToggleOpen = () => {
            this.setState((state) => {
                return { open: !state.open };
            });
        }
        this.onGroupClick = () => {
            this.setState((state) => {
                return { active: !state.active };
            });
        };
        this.onAddGroup = () => {
            this.setState({ addNewGroup: true })
        }
        this.onAddTask = () => {
            this.setState({ addNewTask: true })
        }
        this.onSubmitGroup = (value) => {
            this.state.addNewGroup = false;
            this.props.addNewGroup(value, this.props.group.id);
        }
        this.onSubmitTask = (value) => {
            this.state.addNewTask = false;
            this.props.addNewTask(value, this.props.group.id);
        }
    }
    render() {
        const { group, addNewTask, addNewGroup, onShowTaskEditor } = this.props;
        let groupList, taskList = null;
        let classNameOpenIcon = this.state.open ? 'group__label-icon_open' : '';
        console.log('open', this.state.open);
        if (this.state.open) {
            if (group.groups && group.groups.length > 0) {
                groupList = group.groups.map( (group) => {
                    return (
                        <GroupItem group={ group } 
                            addNewGroup={ addNewGroup }
                            addNewTask={ addNewTask }>
                        </GroupItem>
                    );
                });
            }
            if (group.tasks && group.tasks.length > 0) {
                taskList = group.tasks.map( (task) => {
                    return (
                        <li key={ task.id } className='item-list__task' onClick={ onShowTaskEditor }>
                            {task.label}
                        </li>
                    );
                });
            }
        }
        const buttons = this.state.active ? 
            (   
                <div className='buttons-wrapper'>
                    <AddButton label='group' onAdd={ this.onAddGroup }/>
                    <AddButton label='task' onAdd={ this.onAddTask }/>
                </div> 
            ) : null;
        
        let addForm = null;
        if (this.state.addNewGroup) {
            addForm = <AddForm project={ false } addNewItem={ this.onSubmitGroup }/>;
        } else if (this.state.addNewTask) {
            addForm = <AddForm project={ false } addNewItem={ this.onSubmitTask } />;
        }
        console.log('this key', this.props.group.id);
        return (
            <li className={ this.props.group.id } key={ this.props.group.id.toString() } onClick={ this.onGroupClick }>
                <div className='group__label'>
                    <span className={`group__label-icon ${ classNameOpenIcon }`} onClick={ this.onToggleOpen }></span>
                    { this.props.group.label } 
                    { buttons }
                    { addForm }
                </div>
                <ul> 
                    { groupList }
                    { taskList }
                </ul>
            </li>
        );
    }
}