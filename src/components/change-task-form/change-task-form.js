import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTaskTagsSelector, getAllTagsSelector } from '../../selectors';

import CommentItem from '../comment-item/comment-item';

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
            if (this.state.value === this.state.selectedValue.label) {
                console.log('submit tag', this.state.selectedValue.id)
                this.props.updateTaskAddTag(this.state.selectedValue.id);
            } else {
                this.props.addTag(this.state.value, this.state.setColor);
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
                <div className={`list-color__item list-color__item_${ key } ${ classNameActive }`}
                    onClick={ () => { this.state.onSetColor(key) }}>
                </div>
            );
        });
        let filteredTags, listTags, newTag;
        if (this.state.showSelectList) {
            newTag = (this.state.value.length === 0) ? '' :
                (<div className='tag-form__select-list-item' onClick={ () => { this.onSelectValue(false) }}>
                    { this.state.value } (new)
                </div>);
            filteredTags = (this.props.tags && (this.props.tags.length > 0)) ? this.searchTags() : null;
            listTags = (!filteredTags || (filteredTags.length < 1)) ? null : this.searchTags().map((tag) => {
                if (tag.label === this.state.value) { newTag = '' }
                return (
                    <div className='tag-form__select-list-item' onClick={ () => { this.onSelectValue(tag) }}>
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
class CommentForm extends Component {
    constructor() {
        super();
        this.state = {
            comment: {
                text: '',
                files: []
            }
        }
        this.onChangeComment = (e) => {
            this.setState({
                comment: { text: e.target.value }
            });
        }
    }
    render() {
        return (
            <form className='comment-form'>
                <textarea className='comment-form__comment' placeholder='Напишите комментарий'
                rows='4' value={ this.state.comment.text } onChange={ this.onChangeComment }>
                </textarea>
            </form>
        )
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
            historyVisible: false
        }
        this.onCloseTagForm = () => {
            console.log('close tag form')
            this.setState({ tagFormVisible: false });
        }
        this.onShowTagForm = () => {
            this.setState({ tagFormVisible: true });
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
    }
    render() {
        const { task, assigned, user, taskTags, allTags, deleteTag, changeStatus } = this.props;
        const addTagForm = this.state.tagFormVisible ? 
            <AddTagForm tags={ allTags } onClose={ this.onCloseTagForm } 
                addTag={ this.onAddTag } updateTaskAddTag={ this.onUpdateTaskAddTag }/> : null;
        const tagsList = (!taskTags) ? null : taskTags.map((tag) => {
            const tagClassNames = 'task-form__tag-item_' + tag.color;
            return (
                <div key={tag.id} className={ 'task-form__tag-item ' + tagClassNames }>
                    { tag.label }
                    <span className='task-form__tag-item-delete' onClick={ () => { deleteTag(tag.id) } }>+</span>
                </div>
            );
        });
        const assignedUsers = (!assigned) ? null : assigned.map((user) => {
            return (
                <li key={ user.id } className='task-form__assigned-item'>
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
        const comments = (task.comments.length === 0) ? null : task.comments.map((comment, idx) => {
            return (
                <li key={ idx } className='comment'>
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
                                { task.dateCreated }
                            </div>
                        </div>
                        <div className='task-form__label'>{ task.label }</div>
                        <div className='task-form__tags-wrapper'>
                            { tagsList }
                            { addTagForm }
                            <div className='task-form__tag-item task-form__tag-item_add' onClick={ this.onShowTagForm }>+</div>
                        </div>
                        <div className='task-form__status-info'>
                            <div className='task-form__status'>
                                <StatusForm status={ task.status } changeStatus={ changeStatus }/>
                            </div>
                            <ul className='task-form__assigned-list'>
                                { assignedUsers }
                                <li key='add' className='task-form__assigned-item task-form__assigned-item_add' 
                                    onClick={() => console.log('add assigned')}>+
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <ul className='history'>
                    { history }
                </ul>
                <ul className='comment-list'>
                    { comments }
                </ul>
                <CommentForm />
                <div className='task-form__bottom-menu'>
                    <span className='bottom-menu__item bottom-menu__item_history' onClick={ this.onShowedHistory }>История</span>
                    <span className='bottom-menu__item bottom-menu__item_files'>Файлы</span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        taskTags: getTaskTagsSelector(state, props),
        allTags: getAllTagsSelector(state, props)
    }   
};

export default connect(mapStateToProps)(ChangeTaskForm);
