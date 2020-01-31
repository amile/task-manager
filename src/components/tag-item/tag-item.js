import React, { Component } from 'react';

import './tag-item.sass';

class TagItem extends Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const { tag } = this.props;
    this.props.onDelete(tag.id);
  }

  render() {
    const { tag, onDelete } = this.props;
    const tagClassNames = 'tag_' + tag.color;
    const deleteIcon = !onDelete
      ? null
      : (
        <span className="tag__delete-icon"
          onClick={this.onDelete}
        >
          +
        </span>
      );
    return (
      <div key={tag.id}
        className={'task-form__tag-item tag ' + tagClassNames}
      >
        {tag.label}
        {deleteIcon}
      </div>
    );
  }
}

export default TagItem;
