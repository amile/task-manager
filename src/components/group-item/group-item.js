import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeInnerTasksSelector, makeInnerGroupsSelector } from '../../selectors';
import './group-item.sass';
import AddButton from '../add-button/add-button';
import AddForm from '../add-form/add-form';
import TaskItem from '../task-item/task-item';

export class GroupItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            active: (this.props.activeGroup === this.props.group.id),
            addNewGroup: false
        }
        this.onToggleOpen = () => {
            this.setState((state) => {
                return { open: !state.open };
            });
        }
        this.onGroupClick = () => {
            this.props.onToggleActive(this.props.group.id);
        };
        this.onAddGroup = () => {
            this.setState({ addNewGroup: true })
        }
        this.closeAddForm = () => {
            this.setState({ addNewGroup: false })
        }
        this.onSubmitGroup = (value) => {
            this.state.addNewGroup = false;
            this.props.addNewGroup(value, this.props.group.id);
        }
    }

    render() {
        const { group, activeGroup, onToggleActive, addNewTask, addNewGroup, 
            showTaskEditor, tasks, groups } = this.props;
        let { level } = this.props;
        const active = activeGroup === group.id;
        let classNameOpenIcon = this.state.open ? 'group__label-icon_open' : '';
        const icon = ((groups.length < 1) && (tasks.length < 1)) ? null :
            (<span className={`group__label-icon group__label-icon_level-${ level } ${ classNameOpenIcon }`} onClick={ this.onToggleOpen }></span>)
        const labelClassNames = active ? 'group__label group__label_active' : 'group__label'
        let groupList, taskList = null;
        if (this.state.open) {
            if (groups.length > 0) {
                level++
                groupList = groups.map( (group) => {
                    return (
                        <ConnectedGroupItem group={ group }
                            activeGroup={ activeGroup }
                            addNewGroup={ addNewGroup }
                            onToggleActive={ onToggleActive }
                            addNewTask={ addNewTask }
                            showTaskEditor={ showTaskEditor }
                            level={ level }>
                        </ConnectedGroupItem>
                    );
                });
            }
            if (tasks.length > 0) {
                taskList = tasks.map( (task) => {
                    return (
                        <li key={ task.id } className='item-list__task task-item' onClick={ () => { showTaskEditor(task.id) } }>
                            <TaskItem task={ task } />
                        </li>
                    );
                });
            }
        }
        
        const buttons = active ? 
            (   
                <div className='buttons-wrapper'>
                    <AddButton label='group' onAdd={ this.onAddGroup }/>
                    <AddButton label='task' onAdd={ () => {this.props.addNewTask(group.id)} }/>
                </div> 
            ) : null;
        
        let addForm = null;
        if (this.state.addNewGroup) {
            addForm = <AddForm project={ false } addNewItem={ this.onSubmitGroup } onCloseForm={ this.closeAddForm } />;
        }
        const itemOpenClassName = (!this.state.open) ? '' : 'group_open';
        return (
            <li className={`group item-list__group ${ itemOpenClassName }`} key={ this.props.group.id.toString() }>
                <div className={ labelClassNames }>
                    { icon }
                    <span className='group__label-name' onClick={ this.onGroupClick }>{ group.label } </span>
                    { buttons }
                    { addForm }
                </div>
                <ul> 
                    { taskList }
                    { groupList }
                </ul>
            </li>
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
            grouppp: props.group
        }
    }
    return mapStateToProps;
};
const ConnectedGroupItem = connect(makeMapStateToProps)(GroupItem);
export default ConnectedGroupItem;