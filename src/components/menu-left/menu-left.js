import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addProject, setShowedGroup } from '../../actions';
import { projectsSelector } from '../../selectors';

import AddForm from '../add-form/add-form';
import ConnectedMenuLeftItem from '../menu-left-item/menu-left-item';

import './menu-left.sass';

class MenuLeft extends Component {
    constructor() {
        super();
        this.state = {
            showedGroup: null,
            maxLevel: 3,
            addNewProject: false
        };
        this.onToggleShowed = (id) => {
            this.setState({ showedGroup: id });
            this.props.setShowedGroup(id);
        }
        this.onAddProject = () => {
            this.setState({ addNewProject: true })
        }
        this.onSubmitProject = (value) => {
            this.setState({ addNewProject: false })
            if (value.length > 0) {
                this.props.addProject(value);
            }
        }
    }
    
    render() {
        console.log(this.state.showedGroup);
        const level = 1;
        const listProjects = this.props.projects.map((project) => {
            return <ConnectedMenuLeftItem group={ project } level={ level } 
                maxLevel={ this.state.maxLevel } showed={ this.state.showedGroup } 
                onToggleShowed={ this.onToggleShowed }/>
        });
        const addForm = this.state.addNewProject ? <AddForm project={ true } addNewItem={ this.onSubmitProject }/> : null;
        return (
            <div className='menu-left'>
                <div className='menu-left__item'>Уведомления</div>
                <div className='menu-left__item'>Проекты
                    <span className='menu-left__add-button' onClick={ this.onAddProject }>+</span>
                </div>
                <ul className='projects-list'>
                    { listProjects }
                    <li className='list-item projects-list__item'>
                        { addForm }
                    </li>
                </ul>
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
        addProject: bindActionCreators(addProject, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft);