import React from 'react';


import './item-list.sass';
import GroupItem from '../group-item/group-item';

const ItemList = ({ groupList=[], addNewGroup, addNewTask }) => {

    const drawTasks = ( tasks=[] ) => {
        const items = tasks.map((task) => {
            return <li key={ task.id } className='item-list__task'>{task.label}</li>
        });
        return items;
    }
    const drawGroup = ( groups=[] ) => {
        const items = groups.map((group) => {
            if (!group.label) return null;
            let groupChildren, taskChildren = null;
            if (group.groups && group.groups.length > 0) {
                groupChildren = drawGroup(group.groups);
                
            } 
            if (group.tasks && group.tasks.length > 0) {
                taskChildren = drawTasks(group.tasks);
            }
            const row = (groupChildren || taskChildren) ? 
                (<ul className='item-list'>{ groupChildren }{ taskChildren }</ul>) : null
            return (
                <GroupItem group={ group } 
                    addNewGroup={ addNewGroup }
                    addNewTask={ addNewTask }>{ row }
                </GroupItem>
            );
        });
        return items;
    };
    const itemsList = drawGroup(groupList);
    return (
        <ul className='item-list'>
            { itemsList }
        </ul>
    );
}

export const ItemList1 = ({ project={}, addNewGroup, addNewTask, onShowTaskEditor }) => {

    const drawTasks = ( tasks=[] ) => {
        const items = tasks.map((task) => {
            return <li key={ task.id } className='item-list__task'>{task.label}</li>
        });
        return items;
    }
    const drawGroup = ( groups=[] ) => {
        const items = groups.map((group) => {
            if (!group.label) return null;
            let groupChildren, taskChildren = null;
            if (group.groups && group.groups.length > 0) {
                groupChildren = drawGroup(group.groups);
                
            } 
            if (group.tasks && group.tasks.length > 0) {
                taskChildren = drawTasks(group.tasks);
            }
            const row = (groupChildren || taskChildren) ? 
                (<ul className='item-list'>{ groupChildren }{ taskChildren }</ul>) : null
            return (
                <GroupItem group={ group } 
                    addNewGroup={ addNewGroup }
                    addNewTask={ addNewTask }>{ row }
                </GroupItem>
            );
        });
        return items;
    };
    console.log('project', project)
    let groupList, taskList = null;
    if (project.groups && project.groups.length > 0) {
        groupList = project.groups.map( (group) => {
            return (
                <GroupItem group={ group } 
                    addNewGroup={ addNewGroup }
                    addNewTask={ addNewTask }
                    onShowTaskEditor={ onShowTaskEditor }>>
                </GroupItem>
            );
        });
    }
    if (project.tasks && project.tasks.length > 0) {
        taskList = project.tasks.map( (task) => {
            return <li key={ task.id } className='item-list__task'>{task.label}</li>;
        });
    }
    return (
        <div className='item-list-wrapper'>
            <ul className='item-list'>
                { groupList }
                { taskList }
            </ul>
        </div>
    );
}

export default ItemList;