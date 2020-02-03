import React, { Component } from 'react';

import './list-color-item.sass';

class ColorItem extends Component {
  constructor() {
    super();
    this.onSetColor = this.onSetColor.bind(this);
  }

  onSetColor() {
    this.props.onSetColor(this.props.color);
  }

  render() {
    const { color, active } = this.props;
    const classNameActive = active ? 'list-color__item_active' : '';
    return (
      <div
        className={`list-color__item list-color__item_${ color } ${ classNameActive }`}
        onClick={this.onSetColor}
      />
    );
  }
}

export default ColorItem;
