import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';

import './create-task-form.sass';

class CreateTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      newValue: '',
    };
    this.onChangeValue = (e) => {
      this.setState({ newValue: e.target.value });
    };
    this.addNewValue = (e) => {
      e.preventDefault();
      if (this.state.newValue.length > 0) {
        this.props.addNewItem(this.state.newValue);
      }
      this.setState({newValue: ''});
    };
    this.onCancel = () => {
      this.setState({newValue: ''});
      this.props.onClose();

    };
  }
  render() {
    return (
      <div className="task-form__container">
        <form
          className="create-task-form"
          onSubmit={this.addNewValue}
        >
          <TextareaAutosize
            placeholder="Введите описание задачи…"
            onChange={this.onChangeValue}
            value={this.state.newValue}
          />
          <div className="create-task-form__btn-wrapper">
            <input
              className="btn create-task-form__btn"
              type="submit"
              value="Создать"
            />
          </div>
          <div className="create-task-form__btn-wrapper create-task-form__btn-wrapper_cancel">
            <input
              className="btn create-task-form__btn create-task-form__btn_cancel"
              type="button"
              value="Отменить"
              onClick={this.onCancel}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTaskForm;
