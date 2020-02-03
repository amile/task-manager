import React, { Component } from 'react';

import './comment-file.sass';

class CommentFile extends Component {
  constructor() {
    super();
    this.onDeleteFile = this.onDeleteFile.bind(this);
  }

  onDeleteFile() {
    this.props.onDeleteFile(this.props.file.id);
  }

  render() {
    const { file } = this.props;
    const imageType = file.type.startsWith('image/');
    const image = (!imageType)
      ? null
      : (<img className="file-img" src={file.url} alt="" />);
    return (
      <div className="file-wrapper">
        {image}
        <div className="file-label">
          <a className="file-label-link"
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {file.name}
          </a>
          <a className="file-label-btn"
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            download={file.name}
          >
            Загрузить
          </a>
          <button
            className="file-label-btn"
            onClick={this.onDeleteFile}
          >
            Удалить
          </button>
        </div>
      </div>
    );
  }
}

export default CommentFile;
