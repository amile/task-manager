import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ItemList from '../item-list/item-list';
import TaskForm from '../task-form/task-form';

import * as actions from '../../actions';
import { projectsSelector } from '../../selectors';

import './main-page.sass';


class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            addNew: false,
            showTaskEditor: true,
            showedTask: null,
            createTask: true
        };
        this.addNewTask = (groupId) => {
            const { match } = this.props;
            this.props.history.push(`${ match.url }/task/new/${ groupId }`);
        };
        this.addNewGroup = (value, id) => {
            if (value.length > 0) {
                this.props.addGroup(value, id);
            }
            this.setState({ addNew: false });
        };
        this.showTaskEditor = (taskId) => {
            const { match } = this.props;
            this.props.history.push(`${ match.url }/task/${ taskId }`);
        }
    }
    render() {
        console.log('history', this.props.match);
        const { groupId } = this.props;
        return (
            <div className='main-page'>
                <ItemList 
                    groupId={ groupId }
                    addNewGroup={ this.addNewGroup }
                    addNewTask={ this.addNewTask }
                    showTaskEditor={ this.showTaskEditor }/>
            </div>    
        );
    }
}
const mapStateToProps = (state) => {
    return {
        projects: projectsSelector(state),
    }
};
const mapDispatchToProps = (dispatch) => {
    const { addGroup, taskAdded } = bindActionCreators(actions, dispatch);
    return {
        addGroup: addGroup,
        taskAdded: taskAdded
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);