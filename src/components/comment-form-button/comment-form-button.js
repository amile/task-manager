import React, { Component } from 'react';

import './comment-form-button.sass';

class CommentFormButton extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.type);
  }

  render() {
    const { type, active } = this.props;
    const activeClassName = active ? 'active' : '';
    return (
      <button
        className={`comment-form__btn comment-form__btn_${ type } ${ activeClassName }`}
        onClick={this.handleClick}
      >
      </button>
    );
  }
}

export default CommentFormButton;
