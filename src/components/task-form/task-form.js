import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { formatDate } from '../../utils';

import './task-form.sass';

const task = {
    id: '987',
    label: 'Иерархия пользователей. При удалении пользователя в консоли выводится сообщение об ошибке 500. Пользователь не удаляется',
    dateCreated: new Date(),
    user: {id: '988', passHash: '$2a$08$djyiemyHNqGRKUdinu7zPuGc0Lneo/YmjJ7eER7vXIpFSMqqKFK.e', firstName: 'Дмитрий', lastName: 'Иванов', foto: null},
    status: 'testing',
    assigned: [{id: '989', passHash: '$2a$08$uCHWtGxv1AUd2x09dPLVAuJL7nggyuRCdPwLEhvNA2hsGnuM0k6F.', firstName: 'Борис', lastName: 'Волков', foto: null}],
    tags: [{label: 'Баги', color: 'violet'}, {label: 'В работу', color: 'green'}],
    comments: [
        { label: 'Иерархия пользователей. При удалении пользователя в консоли выводится сообщение об ошибке 500.',
            user: {id: '989', passHash: '$2a$08$uCHWtGxv1AUd2x09dPLVAuJL7nggyuRCdPwLEhvNA2hsGnuM0k6F.', firstName: 'Борис', lastName: 'Волков', foto: null},
            date: new Date()
        },
        { label: 'Есть пара вопросов, смотри во вложении.',
            user: {id: '989', passHash: '$2a$08$uCHWtGxv1AUd2x09dPLVAuJL7nggyuRCdPwLEhvNA2hsGnuM0k6F.', firstName: 'Борис', lastName: 'Волков', foto: null},
            date: new Date()
        }
    ],
    history: [{user: {id: '988', passHash: '$2a$08$djyiemyHNqGRKUdinu7zPuGc0Lneo/YmjJ7eER7vXIpFSMqqKFK.e', firstName: 'Дмитрий', lastName: 'Иванов', foto: null}, label: 'создал задачу', date: new Date() }]
}

class AddTagForm extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            setColor: false,
            colorKeys: ['red', 'violet', 'blue', 'green', 'yellow']
        };
        this.state.onSetColor = (key) => {
            this.setState({ setColor: key });
        };
        this.onChangeValue = (e) => {
            this.setState({ value: e.target.value });
        };
        this.onSubmitTag = (e) => {
            e.preventDefault();
            this.props.addTag(this.state.value, this.state.setColor);
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
        return (
            <form className='tag-form' onClick={ this.onSubmit }>
                <span className='tag-form__close' onClick={ this.props.onClose }>+</span>
                <input type='text' className='tag-form__input' value={ this.state.value } 
                    placeholder='New tag' onChange={ this.onChangeValue } />
                <div className='list-color'>
                    { listColors }
                </div>
                <input type='submit' className='tag-form__add' value='Add'/>
            </form>
        );
    }
}
class CommentForm extends Component {
    constructor() {
        super();
        this.state = {
            comment: {
                text: null,
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
                rows='4' value={ `<b>${ this.state.comment.text }</b>` } onChange={ this.onChangeComment }>
                </textarea>
            </form>
        )
    }
}
const CommentItem = ({ comment }) => {
    return (
        <div>
            <div className='comment__createdBy'>
                <span className='comment__createdBy-icon'>
                    { comment.user.firstName.slice(0, 1) }{ comment.user.lastName.slice(0, 1) }
                </span>
                { comment.user.firstName } { comment.user.lastName }
            </div>
            <div className='comment__createdDate'>{ formatDate(comment.date) }</div>
            <div className='comment__label'>{ comment.label }</div>
        </div>
    );
}
class StatusForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status
        }
    }
    render() {
        return (
            <form className='status-form'>
                <select value={ this.state.status }>
                    <option value='acceptance'>Приемка</option>
                    <option value='process'>В работе</option>
                    <option value='testing'>Тестирование</option>
                    <option value='done'>Выполнено</option>
                </select>
            </form>
        );
    }
}
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: true,
            changeTask: false,
            close: false,
            show: this.props.showTaskEditor,
            tagFormVisible: true,
            historyVisible: false
        }
        this.onClose = () => {
            this.setState({ close: true, show: false });
            this.props.onCloseTaskEditor();
        }
        this.onCloseTagForm = () => {
            this.setState({ tagFormVisible: false });
        }
        this.addTag = (label, color) => {
            console.log(label, color);
        }
        this.onShowedHistory = () => {
            this.setState({ historyVisible: true });
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.showTaskEditor !== prevProps.showTaskEditor) {
            this.setState({ show: this.props.showTaskEditor });;
        }
      }
    render() {
        let classNames = this.state.close ? 'task-form_close' : '';
        if (this.state.show) { classNames = 'task-form_show' }
        const addForm = this.state.tagFormVisible ? <AddTagForm onClose={ this.onCloseTagForm } addTag={ this.addTag } /> : null;
        const tags = (task.tags.length === 0) ? null : task.tags.map((tag) => {
            const clazz = 'task-form__tag-item_' + tag.color;
            return (
                <div className={ 'task-form__tag-item' + clazz }>{ tag.label }</div>
            );
        });
        const assigned = (task.assigned.length === 0) ? null : task.assigned.map((assigned) => {
            return (
                <li key={ assigned.id } className='task-form__assigned-item'>
                    { assigned.firstName.slice(0, 1) + assigned.lastName.slice(0, 1) }
                </li>
            );
        });
        const history = !this.state.historyVisible ? null : task.history.map((item, idx) => {
            return (
                <li key={ idx } className='history__item'>
                    <span className='history__item-date'>{ formatDate(item.date) }</span>
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
            <div className={`task-form ${ classNames }`}>
                <div className='task-form__top-bar'>
                    <span className='task-form__close-icon' onClick={ this.onClose }>+</span>
                </div>
                <div className='task-form__created-info'>
                    <div className='task-form__created-by'>{`${ task.user.firstName } ${ task.user.lastName.slice(0, 1) }.`}</div>
                    <div className='task-form__created-date'>
                        { formatDate(task.dateCreated) }
                    </div>
                </div>
                <div className='task-form__label'>{ task.label }</div>
                <div className='task-form__tags'>{ tags }</div>
                <div className='task-form__status-info'>
                    <div className='task-form__status'><StatusForm status={ task.status }/></div>
                    <ul className='task-form__assigned-list'>
                        { assigned }
                        <li key='add' className='task-form__assigned-item' 
                            onClick={() => console.log('add assigned')}>+
                        </li>
                    </ul>
                </div>
                <ul className='history'>
                    { history }
                </ul>
                <ul className='comment-list'>
                    { comments }
                </ul>
                <CommentForm />
                { addForm }
                <div className='task-form__bottom-menu'>
                    <span className='bottom-menu__item bottom-menu__item_history' onClick={ this.onShowedHistory }>История</span>
                    <span className='bottom-menu__item bottom-menu__item_files'>Файлы</span>
                </div>
            </div>
        );
    }
}

export default TaskForm;