import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { showedTaskSelector, taskCreatedByUserSelector, makeTaskAssignedUsersSelector } from '../../selectors';
import { addTask, addTag, updateTaskAddTag, updateTaskDeleteTag, updateTaskChangeStatus,
            updateTaskAddAssigned, updateTaskDeleteAssigned, updateTaskAddComment,
            updateTaskAddDateDue } from '../../actions';

import CreateTaskForm from '../create-task-form/create-task-form';
import ChangeTaskForm from '../change-task-form/change-task-form';

import './task-form.sass';


class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            close: false,
            show: false
        }
        this.onClose = () => {
            const path = `/group/${ this.props.match.params.groupId }`;
            this.setState({ close: true, show: false });
            setTimeout(() => {this.props.history.push(`${ path }`)}, 1000);
        }
        this.addTag = (label, color) => {
            this.props.addTag(this.props.itemId, { label, color });
        }
        this.updateTaskAddTag = (tagId) => {
            this.props.updateTaskAddTag(this.props.itemId, tagId);
        }
        this.addNewItem = (e) => {
            const { groupId, history, match } = this.props;
            const path = `/group/${ match.params.groupId }`;
            this.props.addTask(e, groupId, history, path);
        }
        this.updateTaskAddDateDue = (date) => {
            this.props.updateTaskAddDateDue(this.props.itemId, date);
        };
        this.updateTaskDeleteTag = (tagId) => {
            this.props.updateTaskDeleteTag(this.props.itemId, tagId);
        };
        this.updateTaskChangeStatus = (status) => {
            this.props.updateTaskChangeStatus(this.props.itemId, status);
        };
        this.updateTaskAddAssigned = (userId) => {
            this.props.updateTaskAddAssigned(this.props.itemId, userId);
        };
        this.updateTaskDeleteAssigned = (userId) => {
            this.props.updateTaskDeleteAssigned(this.props.itemId, userId);
        };
        this.addComment = (label, files) => {
            this.props.updateTaskAddComment(this.props.itemId, label, files);
        };
    }
    componentDidMount() {
        setTimeout(() => {this.setState({ show: true })}, 1000);
    };
    render() {
        const { itemId, groupId, task, user, assigned } = this.props;
        const content = (itemId === 'new') ? <CreateTaskForm addNewItem={ this.addNewItem } onClose={ this.onClose }/> : 
            <ChangeTaskForm task={ task } user={ user } assigned={ assigned } 
                addTag={ this.addTag } updateTaskAddTag={ this.updateTaskAddTag } 
                deleteTag={ this.updateTaskDeleteTag } changeStatus={ this.updateTaskChangeStatus }
                updateTaskAddAssigned={ this.updateTaskAddAssigned } 
                updateTaskDeleteAssigned={ this.updateTaskDeleteAssigned }
                updateTaskAddDateDue={ this.updateTaskAddDateDue } addComment={ this.addComment }/>
        let classNames = this.state.close ? 'task-form_close' : '';
        if (this.state.show) { classNames = 'task-form_show' }
        return (
            <div className={`task-form ${ classNames }`}>
                <div className='task-form__top-bar'>
                    <span className='task-form__close-icon' onClick={ this.onClose }>+</span>
                </div>
                { content }
            </div>
        );
    }
}
const makeMapStateToProps = () => {  
    const taskAssignedUsersSelector = makeTaskAssignedUsersSelector();
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
    return mapStateToProps;
};


const mapDispatchToProps = (dispatch) => {
    return {
        addTask: bindActionCreators(addTask, dispatch),
        addTag: bindActionCreators(addTag, dispatch),
        updateTaskAddTag: bindActionCreators(updateTaskAddTag, dispatch),
        updateTaskDeleteTag: bindActionCreators(updateTaskDeleteTag, dispatch),
        updateTaskChangeStatus: bindActionCreators(updateTaskChangeStatus, dispatch),
        updateTaskAddDateDue: bindActionCreators(updateTaskAddDateDue, dispatch),
        updateTaskAddAssigned: bindActionCreators(updateTaskAddAssigned, dispatch),
        updateTaskDeleteAssigned: bindActionCreators(updateTaskDeleteAssigned, dispatch),
        updateTaskAddComment: bindActionCreators(updateTaskAddComment, dispatch),
    }
};
export default connect(makeMapStateToProps, mapDispatchToProps)(withRouter(TaskForm));