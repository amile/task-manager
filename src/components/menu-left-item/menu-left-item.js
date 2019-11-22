import React, { Component } from 'react';
import { connect } from 'react-redux';

import { makeInnerGroupsSelector } from '../../selectors';

class MenuLeftItem extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        };

        this.onToggleActive = () => {
            this.setState((state) => {
                if ((this.props.level === this.props.maxLevel) 
                    || (this.props.groups.length === 0)) {
                        this.props.onToggleShowed(this.props.group.id);    
                }
                return { open: !state.open }
            })
        };
    }
    render() {
        let { level, maxLevel, showed, onToggleShowed, group, groups } = this.props;
        let iconClassNames = (this.state.open) ? 'icon active' : 'icon';
        const icon = (groups.length > 0) ? (<span className={ iconClassNames }></span>) : null;
        let itemClassNames = (!group.parentId) ? 'projects-list__item-label_project' : '';
        itemClassNames = (showed === group.id) ? (itemClassNames + ' showed') : itemClassNames;
        let listItems = null;
        if (this.state.open && (level < maxLevel)) {
            level++
            listItems = (
                <ul>
                    { groups.map((item) => {
                        return <ConnectedMenuLeftItem group={ item } level={ level } 
                            maxLevel={ maxLevel } showed={ showed } onToggleShowed={ onToggleShowed }/>
                    })}
                </ul>   
            );
        }
        
        return(
            <li key={ group.id } className='list-item projects-list__item'>
                <div className={`projects-list__item-label ${ itemClassNames }`} onClick={ this.onToggleActive }>
                    { icon }
                    { group.label }
                </div>
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