import React, { Component } from 'react';

import './add-form.sass';

export default class AddForm extends Component {
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
        const classNameInput = this.props.project ? 'add-form__input_project' : null;
        return (
            <form className='add-form' onSubmit={ this.addNewValue } >
                <input className={ `add-form__input ${ classNameInput }` } type='text' 
                onChange={ this.onChangeValue } value={ this.state.newValue } />
            </form>
        )
    }
}