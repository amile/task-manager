import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeInnerTasksSelector, makeInnerGroupsSelector } from '../../selectors';
import './group-item.sass';
import AddButton from '../add-button/add-button';
import AddForm from '../add-form/add-form';

export class GroupItem extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            active: false,
            addNewGroup: false
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
        this.onSubmitGroup = (value) => {
            this.state.addNewGroup = false;
            this.props.addNewGroup(value, this.props.group.id);
        }
    }
    render() {
        const { group, addNewTask, addNewGroup, showTaskEditor, tasks, groups } = this.props;
        let groupList, taskList = null;
        if (this.state.open) {
            if (groups.length > 0) {
                groupList = groups.map( (group) => {
                    return (
                        <ConnectedGroupItem group={ group } 
                            addNewGroup={ addNewGroup }
                            addNewTask={ addNewTask }
                            showTaskEditor={showTaskEditor}>
                        </ConnectedGroupItem>
                    );
                });
            }
            if (tasks.length > 0) {
                taskList = tasks.map( (task) => {
                    return (
                        <li key={ task.id } className='item-list__task' onClick={ () => { showTaskEditor(task.id) } }>
                            {task.label}
                        </li>
                    );
                });
            }
        }
        let classNameOpenIcon = this.state.open ? 'group__label-icon_open' : '';
        const icon = ((groups.length < 1) && (tasks.length < 1)) ? null :
            (<span className={`group__label-icon ${ classNameOpenIcon }`} onClick={ this.onToggleOpen }></span>)
        
        const buttons = this.state.active ? 
            (   
                <div className='buttons-wrapper'>
                    <AddButton label='group' onAdd={ this.onAddGroup }/>
                    <AddButton label='task' onAdd={ () => {this.props.addNewTask(group.id)} }/>
                </div> 
            ) : null;
        
        let addForm = null;
        if (this.state.addNewGroup) {
            addForm = <AddForm project={ false } addNewItem={ this.onSubmitGroup }/>;
        }
        return (
            <li key={ this.props.group.id.toString() } onClick={ this.onGroupClick }>
                <div className='group__label'>
                    { icon }
                    { group.label } 
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
const mapDispatchToProps = (dispatch) => {
    
};
const ConnectedGroupItem = connect(makeMapStateToProps, mapDispatchToProps)(GroupItem);
export default ConnectedGroupItem;