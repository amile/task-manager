import React from 'react';
import { connect } from 'react-redux';

import { showedGroupSelector } from '../../selectors';
import './item-list.sass';
import ConnectedGroupItem from '../group-item/group-item';


export const ItemList = ({ group, addNewGroup, addNewTask, showTaskEditor }) => {
    const inner = !group ? null : (
        <ul className='item-list'>
            <ConnectedGroupItem group={ group } 
                addNewGroup={ addNewGroup }
                addNewTask={ addNewTask }
                showTaskEditor={ showTaskEditor }>
            </ConnectedGroupItem>
        </ul>
    );
    return (
        
        <div className='item-list-wrapper'>
            { inner }
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        group: showedGroupSelector(state),
    }
};

export default connect(mapStateToProps)(ItemList);