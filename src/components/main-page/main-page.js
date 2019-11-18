import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ItemList, { ItemList1 } from '../item-list/item-list';
import TaskForm from '../task-form/task-form';

import * as actions from '../../actions';
import { projectsSelector, showedGroup } from '../../selectors';

import './main-page.sass';


class MainPage extends Component {
    constructor() {
        super();
        this.state = {
            addNew: false,
            showTaskEditor: false
        };
        this.onAdd = () => {
            this.setState({ addNew: true});
        };
        this.addNewTask = (value, id) => {
            if (value.length < 1) {
                return;
            }
            this.props.taskAdded(value, id);
            this.setState({ addNew:false });
        }
        this.addNewGroup = (value, id) => {
            if (value.length < 1) {
                return;
            }
            this.props.groupAdded(value, id);
            this.setState({ addNew:false });
        }
        this.onShowTaskEditor = () => {
            this.setState({ showTaskEditor: true });
        }
        this.onCloseTaskEditor = () => {
            this.setState({ showTaskEditor: false });
        }
    }
    render() {
        return (
            <div className='main-page'>
                <ItemList1 project={ this.props.projects[0] } 
                    addNewGroup={ this.addNewGroup }
                    addNewTask={ this.addNewTask }
                    onShowTaskEditor={ this.onShowTaskEditor }/>
                <TaskForm showTaskEditor={ this.state.showTaskEditor }
                    onCloseTaskEditor={ this.onCloseTaskEditor }/>
            </div>    
        );
    }
}
const mapStateToProps = (state) => {
    return {
        projects: state.projects,
        selector: showedGroup(state),
    }
};
const mapDispatchToProps = (dispatch) => {
    const { groupAdded, taskAdded } = bindActionCreators(actions, dispatch);
    return {
        groupAdded: groupAdded,
        taskAdded: taskAdded
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);