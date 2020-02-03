import React, { Component } from 'react';

import './select-list-item.sass';

class SelectListItem extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onIconClick = this.onIconClick.bind(this);
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.item);
    }
  }

  onIconClick() {
    if (this.props.onIconClick) {
      this.props.onIconClick(this.props.item);
    }
  }

  render() {
    const { classNames } = this.props;
    return (
      <div
        className={`select-list__item ${ classNames }`}
        onClick={this.onClick}
      >
        {this.props.children}
        <span
          className="select-list__item-icon"
          onClick={this.onIconClick}
        />
      </div>
    );
  }
}

export default SelectListItem;
