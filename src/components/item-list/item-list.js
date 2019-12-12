import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showedGroupSelector } from '../../selectors';
import './item-list.sass';
import ConnectedGroupItem from '../group-item/group-item';

class ItemList extends Component {
    constructor() {
        super();
        this.state = {
            activeGroup: null
        }
        this.setActiveGroup = (id) => {
            this.setState((state) => {
                const newActiveGroup = (state.activeGroup !== id) ? id : null;
                return { activeGroup: newActiveGroup};
            });
        }
    }
    render () {
        const level = 0;
        const { group, addNewGroup, addNewTask, showTaskEditor } = this.props;
        const inner = !group ? null : (
            <ul className='item-list'>
                <ConnectedGroupItem group={ group }
                    activeGroup={ this.state.activeGroup }
                    onToggleActive={ this.setActiveGroup }
                    addNewGroup={ addNewGroup }
                    addNewTask={ addNewTask }
                    showTaskEditor={ showTaskEditor }
                    level={ level }>
                    
                </ConnectedGroupItem>
            </ul>
        );
        console.log('activeGroup', this.state.activeGroup)
        return (
        
            <div className='item-list-wrapper'>
                { inner }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        group: showedGroupSelector(state),
    }
};

export default connect(mapStateToProps)(ItemList);