import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeInnerGroupsSelector } from '../../selectors';

import ProjectMenu from '../project-menu/project-menu';
import AddForm from '../add-form/add-form';

class MenuLeftItem extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            showProjectMenu: false,
            addGroupForm: false
        };
        this.onToggleProjectMenu = (e) => {
            e.stopPropagation()
            this.setState((state) => {
                return { showProjectMenu: !state.showProjectMenu }
            });
        };
        this.onCloseProjectMenu = () => {
            this.setState({ showProjectMenu: false });
        };
        this.onToggleActive = () => {
            if ((this.props.level === this.props.maxLevel) 
                || (this.props.groups.length === 0)) {
                    this.props.onToggleShowed(this.props.group.id);    
            } else if (this.props.groups.length > 0) {
                this.setState((state) => {
                    return { open: !state.open }
                });
            }
        };
        this.onShowAddGroupForm = () => {
            this.setState({ 
                addGroupForm: true, 
                showProjectMenu: false 
            });
        };
        this.onCloseAddGroupForm = () => {
            this.setState({ 
                addGroupForm: false
            });
        };
        this.addGroup = (label) => {
            if (label.length > 0) {
                this.props.addGroup(label, this.props.group.id);
            }
            this.onCloseAddGroupForm();
        };
    }
    render() {
        let { level, maxLevel, showed, onToggleShowed, group, groups } = this.props;
        let iconClassNames = (this.state.open) ? 'icon active' : 'icon';
        let menuIconClassNames = (!this.state.showProjectMenu) ? 'projects-list__menu-icon' : 
            'projects-list__menu-icon projects-list__menu-icon_close';
        const icon = (groups.length > 0) ? (<span className={ iconClassNames }></span>) : null;
        const menuIcon = (!group.parentId) ? (<span className={ menuIconClassNames }
            onClick={ this.onToggleProjectMenu }>+</span>) : null;
        const projectMenu = !this.state.showProjectMenu ? null : <ProjectMenu addGroup={ this.onShowAddGroupForm } />
        let itemClassNames = (!group.parentId) ? 'projects-list__item_project' : '';
        let labelClassNames = (!group.parentId) ? 'projects-list__item-label_project' : '';
        itemClassNames = (showed === group.id) ? (itemClassNames + ' showed') : itemClassNames;
        let listItems = null;
        const listItemsClassNames = (groups.length === 0) ? 'last' : null;
        const addGroupForm = !this.state.addGroupForm ? null : 
            (<AddForm onCloseForm={ this.onCloseAddGroupForm } addNewItem={ this.addGroup }/>);
        if (this.state.open && (level < maxLevel)) {
            level++
            listItems = (
                <ul className={ listItemsClassNames }>
                    { groups.map((item) => {
                        return <ConnectedMenuLeftItem group={ item } level={ level } 
                            maxLevel={ maxLevel } showed={ showed } onToggleShowed={ onToggleShowed }/>
                    })}
                </ul>   
            );
        }
        
        return(
            <li key={ group.id } className={`list-item projects-list__item ${ itemClassNames }`} >
                <div className={`projects-list__item-label ${ labelClassNames }`} onClick={ this.onToggleActive }>
                    { icon }
                    { menuIcon }
                    { group.label }
                    { projectMenu }
                </div>
                { addGroupForm }
                { listItems }
            </li>
        );
    }
}

const makeMapStateToProps = () => { 
    const innerGroupsSelector = makeInnerGroupsSelector();
    const mapStateToProps = (state, props) => {
        return {
            groups: innerGroupsSelector(state, props)
        }
    }
    return mapStateToProps;
};
const ConnectedMenuLeftItem = connect(makeMapStateToProps)(MenuLeftItem);
export default ConnectedMenuLeftItem;