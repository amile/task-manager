import React, { Component } from 'react';

import './done-checkbox.sass';

class DoneCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: this.props.done,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
  }

  handleCheckbox(e) {
    const done = e.target.checked;
    this.props.handleCheckbox(done);
    this.setState({ done });
  }

  render() {
    return (
      <label onClick={this.handleClick}>
        <input
          className="checkbox"
          type="checkbox"
          checked={this.state.done}
          onChange={this.handleCheckbox}
        />
      </label>
    );
  }
}

export default DoneCheckbox;
