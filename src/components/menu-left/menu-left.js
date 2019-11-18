import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { projectAdded } from '../../actions';
import { projectsSelector } from '../../selectors';

import AddForm from '../add-form/add-form';

import './menu-left.sass';

class MenuLeftItem extends Component {
    constructor() {
        super();
        this.state = {
            active: false
        };

        this.onToggleActive = () => {
            this.setState((state) => {
                if ((this.props.level === this.props.maxLevel) 
                    || (this.props.project.groups.length === 0)) {
                        this.props.onToggleShowed(this.props.project.id);    
                }
                return { active: !state.active }
            })
        };
    }
    render() {
        let { level, maxLevel, project, showed, onToggleShowed } = this.props;
        let iconClassNames = (this.state.active) ? 'icon active' : 'icon';
        const icon = (project.groups.length > 0) ? (<span className={ iconClassNames }></span>) : null;
        let listItems = null;
        let projectClassNames = (level === 1) ? 'projects-list__item-label_project' : '';
        projectClassNames = (showed === project.id) ? (projectClassNames + ' showed') : projectClassNames;
        if (this.state.active && (level <= maxLevel)) {
            level++
            listItems = (
                <ul>
                    { project.groups.map((item) => {
                        
                        return <MenuLeftItem project={ item } level={ level } 
                            maxLevel={ maxLevel } showed={ showed } onToggleShowed={ onToggleShowed }/>
                    })}
                </ul>   
            );
        }
        
        return(
            <li key={project.id} className='list-item projects-list__item'>
                <div className={`projects-list__item-label ${projectClassNames}`} onClick={ this.onToggleActive }>
                    { icon }
                    { project.label }
                </div>
                { listItems }
            </li>
        );
    }
}

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
        }
        this.onAddProject = () => {
            this.setState({ addNewProject: true })
        }
        this.onSubmitProject = (value) => {
            this.setState({ addNewProject: false })
            if (value.length > 0) {
                this.props.projectAdded(value);
            }
        }
    }
    
    render() {
        const level = 1;
        const listProjects = this.props.projects.map((project) => {
            return <MenuLeftItem project={ project } level={ level } 
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
        projectAdded: bindActionCreators(projectAdded, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft);