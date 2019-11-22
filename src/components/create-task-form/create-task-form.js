import React, { Component } from 'react';

class CreateTaskForm extends Component {
    constructor() {
        super();
        this.state = {
            newValue: ''
        };
        this.onChangeValue = (e) => {
            this.setState({ newValue: e.target.value });
        };
        this.addNewValue = (e) => {
            console.log('add new task');
            e.preventDefault();
            this.props.addNewItem(this.state.newValue);
            this.state.newValue = '';
        };
    }
    render() {
        return (
            <div className='task-form__container'>
                <form className='' onSubmit={ this.addNewValue } >
                    <textarea className='' placeholder='Напишите текст задачи' 
                        onChange={ this.onChangeValue } value={ this.state.newValue }>
                    </textarea>
                    <input type='submit' value='Создать задачу'/>
                </form>
            </div>
            
        )
    }
}

export default CreateTaskForm;