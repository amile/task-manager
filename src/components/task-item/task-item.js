import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as moment from 'moment';
import 'moment/locale/ru';

import { makeTaskAssignedUsersSelector, taskAssignedUsersIdSelector,
    getTaskTagsSelector } from '../../selectors';
import { formatStatus } from '../../utils';

import './task-item.sass';

moment.locale('ru', {
    calendar : {
        lastDay : '[Вчера]',
        sameDay : '[Сегодня]',
        nextDay : '[Завтра]',
        lastWeek : 'D MMM',
        nextWeek : 'D MMM',
        sameElse : 'D MMM'
    }
});

class TaskItem extends Component {
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
                    { moment(task.dateDue).calendar() }
                    <span className='task-item__date-time'>                        
                        { moment(task.dateDue).format('H:mm') }
                    </span>
                </div>);
        return (
            <Fragment>
                <div className='task-item__label'>
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
    const mapStateToProps = (state, props) => {
        return {
            assigned: taskAssignedUsersSelector(state, {itemId: props.task.id}),
            tags: getTaskTagsSelector(state, props)
        }   
    };
    return mapStateToProps;
};

export const ConnectTaskItem = connect(makeMapStateToProps)(TaskItem);

export default ConnectTaskItem;