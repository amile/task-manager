import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addGroup } from '../../actions';
import { showedGroupSelector } from '../../selectors';

import ConnectedGroupItem from '../group-item/group-item';

import './item-list.sass';

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
        this.addNewGroup = (value, id) => {
            if (value.length > 0) {
                this.props.addGroup(value, id);
            }
        };
        this.addNewTask = (groupId) => {
            const { match } = this.props;
            this.props.history.push(`${ match.url }/task/new/${ groupId }`);
        };
        this.showTaskEditor = (taskId) => {
            const { match } = this.props;
            this.props.history.push(`${ match.url }/task/${ taskId }`);
        }
    }
    render () {
        const level = 0;
        const { group, history } = this.props;
        const inner = !group ? null : (
            <ul className='item-list'>
                <ConnectedGroupItem group={ group }
                    activeGroup={ this.state.activeGroup }
                    onToggleActive={ this.setActiveGroup }
                    addNewGroup={ this.addNewGroup }
                    addNewTask={ this.addNewTask }
                    showTaskEditor={ this.showTaskEditor }
                    level={ level } history={ history }>    
                </ConnectedGroupItem>
            </ul>
        );
        return (
            <div className='item-list-wrapper'>
                { inner }
            </div>
        );
    }
}

const mapStateToProps = (props, state) => {
    return {
        group: showedGroupSelector(props, state),
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addGroup: bindActionCreators(addGroup, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);