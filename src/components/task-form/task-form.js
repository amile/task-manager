import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { showedTaskSelector, taskCreatedByUserSelector, taskAssignedUsersSelector } from '../../selectors';
import { addTask, addTag, updateTaskAddTag, updateTaskDeleteTag, updateTaskChangeStatus } from '../../actions';

import CreateTaskForm from '../create-task-form/create-task-form';
import ChangeTaskForm from '../change-task-form/change-task-form';

import './task-form.sass';


class TaskForm extends Component {
    constructor() {
        super();
        this.state = {
            close: false,
            show: false
        }
        this.onClose = () => {
            this.setState({ close: true, show: false });
            setTimeout(() => {this.props.history.push('/')}, 1000);
        }
        this.addTag = (label, color) => {
            this.props.addTag(this.props.itemId, { label, color });
        }
        this.updateTaskAddTag = (tagId) => {
            this.props.updateTaskAddTag(this.props.itemId, tagId);
        }
        this.addNewItem = (e) => {
            this.props.addTask(e, this.props.groupId);
            this.onClose();
        }
        this.updateTaskDeleteTag = (tagId) => {
            this.props.updateTaskDeleteTag(this.props.itemId, tagId);
        };
        this.updateTaskChangeStatus = (status) => {
            this.props.updateTaskChangeStatus(this.props.itemId, status);
        };
    }
    componentDidMount() {
        setTimeout(() => {this.setState({ show: true })}, 1000);
    };
    render() {
        const { itemId, groupId, task, user, assigned } = this.props;
        const content = (itemId === 'new') ? <CreateTaskForm addNewItem={ this.addNewItem }/> : 
            <ChangeTaskForm task={ task } user={ user } assigned={ assigned } 
                addTag={ this.addTag } updateTaskAddTag={ this.updateTaskAddTag } 
                deleteTag={ this.updateTaskDeleteTag } changeStatus={ this.updateTaskChangeStatus }/>
        let classNames = this.state.close ? 'task-form_close' : '';
        if (this.state.show) { classNames = 'task-form_show' }
        return (
            <div className={`task-form ${ classNames }`}>
                <div className='task-form__top-bar'>
                    <span className='task-form__close-icon' onClick={ this.onClose }>+</span>
                </div>
                { content }
                <div className='task-form__bottom-menu'>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    let task, user, assigned = null;
    if (!isNaN(props.itemId)) {
        task = showedTaskSelector(state, props);
        user = taskCreatedByUserSelector(state, props);
        assigned = taskAssignedUsersSelector(state, props);
    }
    return {
        task: task,
        user: user,
        assigned: assigned
    }   
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: bindActionCreators(addTask, dispatch),
        addTag: bindActionCreators(addTag, dispatch),
        updateTaskAddTag: bindActionCreators(updateTaskAddTag, dispatch),
        updateTaskDeleteTag: bindActionCreators(updateTaskDeleteTag, dispatch),
        updateTaskChangeStatus: bindActionCreators(updateTaskChangeStatus, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskForm));