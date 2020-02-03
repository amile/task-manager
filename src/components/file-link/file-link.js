import React, { Component } from 'react';

import './file-link.sass';

class FileLink extends Component {
  constructor() {
    super();
    this.onDeleteFile = this.onDeleteFile.bind(this);
  }

  onDeleteFile() {
    this.props.onDeleteFile(this.props.file.name);
  }

  render() {
    const { file } = this.props;
    return (
      <div className="comment-form__load-file">
        <span>{file.name}</span>
        <span className="comment-form__load-file-cancel"
          onClick={this.onDeleteFile}
        > +</span>
      </div>
    );
  }
}

export default FileLink;
