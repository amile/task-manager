import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import 'moment/locale/ru';

import { getTaskTagsSelector, getAllTagsSelector, usersSelector, getTaskCommentsSelector } from '../../selectors';

import CommentItem from '../comment-item/comment-item';
import CommentForm from '../comment-form/comment-form';

import './change-task-form.sass';


class AddTagForm extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            setColor: 'red',
            colorKeys: ['red', 'violet', 'blue', 'green', 'yellow'],
            showSelectList: false,
            selectedValue: ''
        };
        this.state.onSetColor = (key) => {
            if (!this.state.selectedValue.label || (this.state.value !== this.state.selectedValue.label)) {
                this.setState({ setColor: key });
            }
        };
        this.onChangeValue = (e) => {
            this.setState({ value: e.target.value });
        };
        this.onSubmitTag = (e) => {
            e.preventDefault();
            const { value, selectedValue } = this.state;
            if (value === selectedValue.label) {
                this.props.updateTaskAddTag(selectedValue.id);
            } 
            else if (value.length > 0) {
                this.props.addTag(value, this.state.setColor);
            }
        };
        this.onShowSelectList = () => {
            this.setState({ showSelectList: true });
        }
        this.searchTags = () => {
            if (this.state.value === '') { return this.props.tags }
            const filterTags = this.props.tags.filter((item) => {
                return item.label.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1;
            });
            return filterTags;
        }
        this.onSelectValue = (tag) => {
            if (!tag) {
                this.setState({showSelectList: false});
            } else {
                this.setState(
                    { 
                        value: tag.label,
                        setColor: tag.color, 
                        selectedValue: tag,
                        showSelectList: false 
                    }
                );
            }
        };
    }
    render() {
        const listColors = this.state.colorKeys.map((key) => {
            const classNameActive = (key === this.state.setColor) ? 'list-color__item_active' : '';
            return (
                <div key = {key} className={`list-color__item list-color__item_${ key } ${ classNameActive }`}
                    onClick={ () => { this.state.onSetColor(key) }}>
                </div>
            );
        });
        let filteredTags, listTags, newTag;
        if (this.state.showSelectList) {
            newTag = (this.state.value.length === 0) ? '' :
                (<div key='new' className='tag-form__select-list-item' onClick={ (e) => {  this.onSelectValue(false) }}>
                    { this.state.value } (new)
                </div>);
            filteredTags = (this.props.tags && (this.props.tags.length > 0)) ? this.searchTags() : null;
            listTags = (!filteredTags || (filteredTags.length < 1)) ? null : this.searchTags().map((tag) => {
                if (tag.label === this.state.value) { newTag = '' }
                return (
                    <div key={ tag.id } className='tag-form__select-list-item' onClick={ () => { this.onSelectValue(tag) }}>
                        { tag.label }
                    </div>
                )
            });
        }
        
        return (
            <form className='tag-form' onSubmit={ this.onSubmitTag }>
                <span className='tag-form__close' onClick={ this.props.onClose }>+</span>
                
                <div className='tag-form__select-wrapper'>
                    <input type='text' className='tag-form__input' value={ this.state.value } 
                        placeholder='New tag' onFocus={ this.onShowSelectList } 
                        onChange={ this.onChangeValue } />
                    <div className='tag-form__select-list'>
                        { newTag }
                        { listTags }
                    </div>
                </div>
                <div className='list-color'>
                    { listColors }
                </div>
                <input type='submit' className='tag-form__add' value='Добавить'/>
            </form>
        );
    }
}

class AddAssignedForm extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            showSelectList: false,
            selectedValue: ''
        };
        this.onChangeValue = (e) => {
            this.setState({ value: e.target.value });
        };
        this.onSubmitAssigned = (e) => {
            e.preventDefault();
            if (this.state.value === this.state.selectedValue.fullName) {
                this.props.updateTaskAddAssigned(this.state.selectedValue.id);
            }
        };
        this.onShowSelectList = () => {
            this.setState({ showSelectList: true });
        };
        this.searchUsers = () => {
            if (this.state.value === '') { return this.props.users }
            const filterUsers = this.props.users.filter((item) => {
                const fullName = item.lastName + ' ' + item.firstName;
                return fullName.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1;
            });
            return filterUsers;
        };
        this.onSelectValue = (user) => {
            const fullName = user.lastName + ' ' + user.firstName;
            this.setState(
                { 
                    value: fullName,
                    selectedValue: {id: user.id, fullName},
                    showSelectList: false 
                }
            );
        };
    }
    render() {
        let listUsers, filteredUsers = null;
        if (this.state.showSelectList) {
            filteredUsers = (this.props.users && (this.props.users.length > 0)) ? this.searchUsers() : null;
            listUsers = (!filteredUsers || (filteredUsers.length < 1)) ? null : filteredUsers.map((user) => {
                return (
                    <div key={ user.id } className='assigned-form__select-list-item' onClick={ () => { this.onSelectValue(user) }}>
                        { user.lastName + ' ' + user.firstName }
                    </div>
                )
            });
        }
        
        return (
            <form className='assigned-form' onSubmit={ this.onSubmitAssigned }>
                <span className='assigned-form__close' onClick={ this.props.onClose }>+</span>
                
                <div className='assigned-form__select-wrapper'>
                    <input type='text' className='assigned-form__input' value={ this.state.value } 
                        placeholder='Введите имя' onFocus={ this.onShowSelectList } 
                        onChange={ this.onChangeValue } />
                    <div className='assigned-form__select-list'>
                        { listUsers }
                    </div>
                </div>
                <input type='submit' className='assigned-form__add' value='Добавить'/>
            </form>
        );
    }
}


class StatusForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status
        }
        this.changeStatus = (e) => {
            this.props.changeStatus(e.target.value);
            this.setState({ status: e.target.value });
        }; 
    }
    render() {
        const selectClassNames = 'status-form__select status-form__select_' + this.state.status;
        const selectIconClassNames = 'status-form__select-icon status-form__select-icon_' + this.state.status;
        return (
            <form className='status-form'>
                <span className={ selectIconClassNames }></span>
                <select className={ selectClassNames } value={ this.state.status } onChange={ this.changeStatus }>
                    <option value='acceptance'>Приемка</option>
                    <option value='process'>В работе</option>
                    <option value='testing'>Тестирование</option>
                    <option value='done'>Выполнено</option>
                </select>
            </form>
        );
    }
}

class ChangeTaskForm extends Component {
    constructor() {
        super();
        this.state = {
            tagFormVisible: false,
            assignedFormVisible: false,
            historyVisible: false
        }
        this.onCloseTagForm = () => {
            this.setState({ tagFormVisible: false });
        }
        this.onShowTagForm = () => {
            this.setState({ tagFormVisible: true });
        }
        this.onCloseAssignedForm = () => {
            this.setState({ assignedFormVisible: false });
        }
        this.onShowAssignedForm = () => {
            this.setState({ assignedFormVisible: true });
        }
        this.onShowedHistory = () => {
            this.setState({ historyVisible: true });
        }
        this.onAddTag = (label, color) => {
            this.props.addTag(label, color);
            this.onCloseTagForm();
        }
        this.onUpdateTaskAddTag = (tagId) => {
            this.props.updateTaskAddTag(tagId);
            this.onCloseTagForm();
        }
        this.updateTaskAddAssigned = (userId) => {
            this.props.updateTaskAddAssigned(userId);
            this.onCloseAssignedForm();
        }
    }
    render() {
        const { task, assigned, user, users, taskTags, allTags, deleteTag, changeStatus, comments } = this.props;
        const addTagForm = this.state.tagFormVisible ? 
            <AddTagForm tags={ allTags } onClose={ this.onCloseTagForm } 
                addTag={ this.onAddTag } updateTaskAddTag={ this.onUpdateTaskAddTag }/> : null;
        const tagsList = (!taskTags) ? null : taskTags.map((tag) => {
            const tagClassNames = 'tag_' + tag.color;
            return (
                <div key={tag.id} className={ 'task-form__tag-item tag ' + tagClassNames }>
                    { tag.label }
                    <span className='task-form__tag-item-delete' onClick={ () => { deleteTag(tag.id) } }>+</span>
                </div>
            );
        });
        const addAssignedForm = this.state.assignedFormVisible ? 
            <AddAssignedForm users={ users } onClose={ this.onCloseAssignedForm } 
                updateTaskAddAssigned={ this.updateTaskAddAssigned }/> : null;
        const assignedUsers = (!assigned) ? null : assigned.map((user) => {
            return (
                <li key={ user.id } className='task-form__assigned-item user-icon'>
                    { user.firstName.slice(0, 1) + user.lastName.slice(0, 1) }
                </li>
            );
        });
        const history = !this.state.historyVisible ? null : task.history.map((item, idx) => {
            return (
                <li key={ idx } className='history__item'>
                    <span className='history__item-date'>{ item.date }</span>
                    <span className='history__item-user'>{`${ item.user.firstName } ${ item.user.lastName.slice(0, 1) }.`}</span>
                    { item.label }
                </li>
            );
        });
        const listComments = (!comments) ? null : comments.map((comment) => {
            return (
                <li key={ comment.id } className='comment list__item'>
                    <CommentItem comment={ comment } />
                </li>
            );
        });
        return (
            <div>
                <section className='task-form__task-info'>
                    <div className='task-form__container'>
                        <div className='task-form__created-info'>
                            <div className='task-form__created-by'>{`${ user.lastName } ${ user.firstName.slice(0, 1) }.`}</div>
                            <div className='task-form__created-date'>
                                { moment(task.dateCreated).format('DD MMMM YYYY, h:mm') }
                            </div>
                        </div>
                        <div className='task-form__label'>{ task.label }</div>
                        <div className='task-form__tags-wrapper'>
                            { tagsList }
                            { addTagForm }
                            <div className='tag task-form__tag-item task-form__tag-item_add' onClick={ this.onShowTagForm }>+</div>
                        </div>
                        <div className='task-form__status-info'>
                            <div className='task-form__status'>
                                <StatusForm status={ task.status } changeStatus={ changeStatus }/>
                            </div>
                            <ul className='task-form__assigned-list'>
                                { assignedUsers }
                                <li key='add' className='user-icon task-form__assigned-item task-form__assigned-item_add' 
                                    onClick={ this.onShowAssignedForm }>+
                                </li>
                                { addAssignedForm }
                            </ul>
                        </div>
                    </div>
                </section>
                <section className='task-form__discussion'>
                    <ul className='history'>
                        { history }
                    </ul>
                    <div className='task-form__container'>
                        <ul className='list comment-list'>
                            { listComments }
                        </ul>
                    </div>
                </section>
                <section className='task-form__task-info'>
                    <div className='task-form__container'>
                        <CommentForm addComment={ this.props.addComment }/>
                    </div>
                </section>
                
                <section className='task-form__bottom-menu'>
                    <div className='task-form__container bottom-menu__container'>
                        <div className='bottom-menu__item'>
                            <span className='bottom-menu__item-icon bottom-menu__item-icon_files'></span>
                            Файлы
                        </div> 
                        <div className='bottom-menu__item'  onClick={ this.onShowedHistory }>
                            <span className='bottom-menu__item-icon bottom-menu__item-icon_history'></span>
                            История
                        </div>
                        <div className='bottom-menu__item bottom-menu__item_menu'>
                            <span className='bottom-menu__item-icon bottom-menu__item-icon_menu'></span> 
                        </div>  
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        taskTags: getTaskTagsSelector(state, props),
        allTags: getAllTagsSelector(state, props),
        users: usersSelector(state),
        comments: getTaskCommentsSelector(state, props),
    }   
};

export default connect(mapStateToProps)(ChangeTaskForm);
