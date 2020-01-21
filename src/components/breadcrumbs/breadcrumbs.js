import React, { Component } from 'react';
import { connect } from 'react-redux';

import { groupsSelector, projectsSelector } from '../../selectors';

import './breadcrumbs.sass';


class Breadcrumbs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parents: []
        }
    }
    generateBreadcrumbs(groups, projects, id) {
        const parents = [];
        const getParents = (groups, projects, id) => {
            let group = groups.find((group) => group.id === id);
            if (!group) {
                group = projects.find((group) => group.id === id);
                parents.push(group);
                return;
            }
            else if (group) {
                parents.push(group)
                return getParents(groups, projects, group.parentId);
            }
        };
        getParents(groups, projects, id)
        return parents.reverse();
    }
    componentDidMount() {
        const { groups, projects } = this.props;
        const id = this.props.child.parentId;
        const parents = this.generateBreadcrumbs(groups, projects, id);
        this.setState({ parents });

    }
    componentDidUpdate(prevProps) {
        if (this.props.child.id !== prevProps.child.id) {
            const { groups, projects } = this.props;
            const id = this.props.child.parentId;
            const parents = this.generateBreadcrumbs(groups, projects, id);
            this.setState({ parents });
        }

    }
    render() { 
        const { child } = this.props
        const { parents } = this.state
        let breadcrumbs = (parents.length === 0) 
            ? null 
            : parents.map((item) => {
            return (<li className='breadcrumbs__item' key={ item.id }>{ item.id }</li>)
            })
        const rest = (!breadcrumbs || breadcrumbs.length < 8) ? null : (<li className='breadcrumbs__item' key='rest'>...</li>);
        const active = !breadcrumbs ? null
            : <li className='breadcrumbs__item breadcrumbs__item_active' key={child.id}>{ child.id }. { child.label }</li>
        breadcrumbs = !rest ? breadcrumbs : [...breadcrumbs.slice(0, 3), rest, ...breadcrumbs.slice(breadcrumbs.length - 3)]
        return (
        <ul className='breadcrumbs'>{ breadcrumbs }{ active }</ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        groups: groupsSelector(state),
        projects: projectsSelector(state)
    }   
};

export const ConnectBreadcrubms = connect(mapStateToProps)(Breadcrumbs);

export default ConnectBreadcrubms;
