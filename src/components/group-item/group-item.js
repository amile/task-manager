import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeInnerTasksSelector, makeInnerGroupsSelector } from '../../selectors';
import { updateGroupSetDone } from '../../actions';

import AddButton from '../add-button/add-button';
import AddGroupForm from '../add-group-form/add-group-form';
import TaskItem from '../task-item/task-item';
import DoneCheckbox from '../done-checkbox/done-checkbox';

import './group-item.sass';

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
        this.handleCheckbox = (done) => {
            const { id } = this.props.group;
            this.props.updateGroupSetDone(id, done );
        }
    }

    render() {
        const { group, activeGroup, onToggleActive, addNewTask, addNewGroup, 
            showTaskEditor, tasks, groups, history } = this.props;
        let { level } = this.props;
        const active = activeGroup === group.id;
        let classNameOpenIcon = this.state.open ? 'group__label-icon_open' : '';
        const labelClassNames = active ? 'group__label group__label_active' : 'group__label'
        let groupList, taskList = null;
        let nexFloor = null
        let levelToClass = level;
        if (this.state.open) {
            if (level > 9 && (level % 10) === 0) {
                nexFloor = 'next-floor';
                level = 0;
                levelToClass = 0;
            }
            if (groups.length > 0) {
                level++
                groupList = groups.map( (group) => {
                    return (
                        <div key={ group.id }>
                            <ConnectedGroupItem group={ group }
                            activeGroup={ activeGroup }
                            addNewGroup={ addNewGroup }
                            onToggleActive={ onToggleActive }
                            addNewTask={ addNewTask }
                            showTaskEditor={ showTaskEditor }
                            level={ level } history={ history } />
                        </div>
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
        
        const icon = ((groups.length < 1) && (tasks.length < 1)) ? null :
            (<span className={`group__label-icon group__label-icon_level-${ levelToClass } ${ classNameOpenIcon }`} 
                onClick={ this.onToggleOpen }></span>);
        const buttons = active ? 
            (   
                <div className='buttons-wrapper'>
                    <AddButton label='task' onAdd={ () => {this.props.addNewTask(group.id)} }/>
                    <AddButton label='group' onAdd={ this.onAddGroup }/>
                </div> 
            ) : null;
        const checkbox = !active ? null
            : (<DoneCheckbox done={ group.done } handleCheckbox={ this.handleCheckbox }/>);
        let addForm = null;
        if (this.state.addNewGroup) {
            addForm = <AddGroupForm project={ false } addNewItem={ this.onSubmitGroup } onCloseForm={ this.closeAddForm } />;
        }
        const itemOpenClassName = (!this.state.open) ? '' : 'group_open';
        return (
            <li className={`group item-list__group ${ itemOpenClassName } ${ nexFloor }`} key={ this.props.group.id.toString() }>
                {/* { checkbox } */}
                <div className={ labelClassNames }>
                    { icon }
                    { checkbox }
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
            groups: innerGroupsSelector(state, props)
        }
    }
    return mapStateToProps;
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateGroupSetDone: bindActionCreators(updateGroupSetDone, dispatch)
    }
};

const ConnectedGroupItem = connect(makeMapStateToProps, mapDispatchToProps)(GroupItem);
export default ConnectedGroupItem;
