import React, { Component } from 'react';

import './add-group-form.sass';

export default class AddGroupForm extends Component {
    constructor() {
        super();
        this.state = {
            newValue: ''
        };
        this.onChangeValue = (e) => {
            this.setState({ newValue: e.target.value });
        };
        this.addNewValue = (e) => {
            e.preventDefault();
            this.props.addNewItem(this.state.newValue);
            this.state.newValue = '';
        };
    }
    render() {
        const classNames = this.props.project ? 'add-form_project' : null;
        const placeholder = this.props.project ? 'Новый проект' : 'Новая группа';
        return (
            <form className={`add-form ${ classNames }`} onSubmit={ this.addNewValue } >
                <input className='add-form__input' type='text' placeholder={ placeholder }
                onChange={ this.onChangeValue } value={ this.state.newValue } />
                <span className='tag-form__close add-form__btn add-form__btn_add' onClick={ this.addNewValue }>+</span>
                <span className='tag-form__close add-form__btn add-form__btn_close' onClick={ this.props.onCloseForm }>+</span>
            </form>
        )
    }
}