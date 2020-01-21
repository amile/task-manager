import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { makeTaskAssignedUsersSelector, makeTaskTagsSelector } from '../../selectors';
import { formatStatus, getCalendarDate, getTime } from '../../utils';

import './task-item.sass';

class TaskItem extends Component {
    constructor() {
        super();
        this.handleCheckbox = (e) => {
            e.stopPropagation();
            console.log(e);
        }
    }
    render() {
        const { task, assigned, tags } = this.props;
        const userIconClassNames = (assigned && (assigned.length >= 3)) ? 'user-icon_align' : '';
        const assignedList = (!assigned) ? null : assigned.slice(0, 3).map((user) => {
            return (
                <li key={ user.id } className={`user-icon task-item__user-icon ${ userIconClassNames }`}>
                    { user.firstName.slice(0, 1) + user.lastName.slice(0, 1) }
                </li>
            );
        })
        const restUsers = (!assigned || (assigned.length < 4)) ? null : (
            <li key='rest' className='user-icon user-icon_rest task-item__user-icon'>
                +{ assigned.length - 3 }
            </li>
        )
        const tagList = (!tags) ? null : tags.map((tag) => {
            return (
                <div key={ tag.id } className={`tag tag_${ tag.color }`}>
                    { tag.label }
                </div>
            );
        });
        const comments = (task.comments && task.comments.length) ? task.comments.length : null;
        const dateDue = (!task.dateDue) ? null 
            : ( <div className='task-item__date'>
                    { getCalendarDate(task.dateDue) }
                    <span className='task-item__date-time'>                        
                        { getTime(task.dateDue) }
                    </span>
                </div>);
        return (
            <Fragment>
                <div className='task-item__label'>
                    <label onClick={ (e)=> e.stopPropagation() }>
                    <input type='checkbox' checked={ task.status === 'done' } 
                        className='task-item__checkbox' onChange={ this.handleCheckbox }/></label>
                    { task.label }
                    <span className='task-item__comments'>{ comments }</span>
                    { tagList }
                </div>
                <div className={`task-item__status status_${ task.status }`}>
                    { formatStatus(task.status) }
                </div>
                <ul className='task-item__assigned'>
                    { assignedList }
                    { restUsers }
                </ul>
                { dateDue }
            </Fragment>
        );
    }
}

const makeMapStateToProps = () => {
    const taskAssignedUsersSelector = makeTaskAssignedUsersSelector();
    const taskTagsSelector = makeTaskTagsSelector()
    const mapStateToProps = (state, props) => {
        return {
            assigned: taskAssignedUsersSelector(state, {itemId: props.task.id}),
            tags: taskTagsSelector(state, props)
        }   
    };
    return mapStateToProps;
};

export const ConnectTaskItem = connect(makeMapStateToProps)(TaskItem);

export default ConnectTaskItem;