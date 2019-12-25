import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { addProject, setShowedGroup, addGroup } from '../../actions';
import { projectsSelector } from '../../selectors';

import AddForm from '../add-form/add-form';
import ConnectedMenuLeftItem from '../menu-left-item/menu-left-item';

import './menu-left.sass';

class MenuLeft extends Component {
    constructor() {
        super();
        this.state = {
            maxLevel: 3,
            showAddProjectForm: false
        };
        this.onAddProject = () => {
            this.setState({ showAddProjectForm: true })
        }
        this.onCloseAddProjectForm = () => {
            this.setState({ showAddProjectForm: false })
        }
        this.onSubmitProject = (label) => {
            this.setState({ showAddProjectForm: false })
            if (label.length > 0) {
                this.props.addProject(label);
            }
        }
        this.addGroup = (label, parentId) => {
            this.props.addGroup(label, parentId);
        }
    }
    
    render() {
        const level = 0;
        const listProjects = (this.props.projects.length === 0) ? null : this.props.projects.map((project) => {
            return (
                <li key={ project.id } className='list-item projects-list__item projects-list__item_project'>
                    <ConnectedMenuLeftItem group={ project } level={ level } 
                        maxLevel={ this.state.maxLevel } addGroup={ this.addGroup }/>
                </li>
            );
        });
        const addForm = this.state.showAddProjectForm ? <AddForm project={ true } addNewItem={ this.onSubmitProject }
            onCloseForm={ this.onCloseAddProjectForm }/> : null;
        return (
            <div className='menu-left'>
                <div className='menu-left__container'>
                    <div className='menu-left__item'>Уведомления</div>
                    <div className='menu-left__item'>Проекты
                        <span className='menu-left__add-button' onClick={ this.onAddProject }>+</span>
                    </div>
                    <ul className='projects-list'>
                        <li key='add' className='list-item projects-list__item'>
                            { addForm }
                        </li>
                        { listProjects }
                    </ul>
                    <div className='menu-left__bottom-bar'>
                        <span className='menu-left__bottom-bar-icon'></span>
                    </div>
                </div>    
            </div>
        )
    }  
};

const mapStateToProps = (state) => {
    return {
        projects: projectsSelector(state)
    }   
};
const mapDispatchToProps = (dispatch) => {
    return {
        setShowedGroup: bindActionCreators(setShowedGroup, dispatch),
        addProject: bindActionCreators(addProject, dispatch),
        addGroup: bindActionCreators(addGroup, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenuLeft));