import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';
import * as moment from 'moment';

import { makeCommentCreatedByUserSelector, makeCommentFilesSelector } from '../../selectors';

import './comment-item.sass';

moment.updateLocale('ru');

class CommentItem extends Component {
  constructor() {
    super();
    this.decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
  }
  render() {
    const { user, comment, files } = this.props;
    let imageList = null;
    if (files) {
      imageList = files.map((file) => {
        const imageType = file.type.startsWith('image/');
        const image = (!imageType)
          ? null
          : (<img className="file-img" src={file.url} alt="" />);
        return (
          <div key={file.name}
            className="file-wrapper"
          >
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
                onClick={() => this.props.updateCommentDeleteFile(comment.id, file.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        );
      });

    }
    const label = !comment.label
      ? EditorState.createEmpty(this.decorator)
      : EditorState.createWithContent(convertFromRaw(JSON.parse(comment.label)), this.decorator);
    return (
      <div className="comment__wrapper">
        <div className="comment__created-info">
          <div className="comment__user">
            <span className="comment__user-icon user-icon">
              {user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}
            </span>
            {user.firstName} {user.lastName}
          </div>
          <div className="comment__date list__item-date">
            {moment(comment.date).format('DD MMMM YYYY, HH:mm')}
          </div>
        </div>
        <div className="comment__label">
          <Editor editorState={label}
            readOnly
          />
        </div>
        <div>
          {imageList}
        </div>
      </div>
    );
  }
}

const Link = (props) => {
  const { url } = props.contentState
    .getEntity(props.entityKey).getData();

  return (
    <a href={url}
      title={url}
      className="ed-link"
    >
      {props.children}
    </a>
  );
};

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback,
  );
}

const makeMapStateToProps = () => {
  const commentCreatedByUserSelector = makeCommentCreatedByUserSelector();
  const commentFilesSelector = makeCommentFilesSelector();
  const mapStateToProps = (state, props) => {
    return {
      user: commentCreatedByUserSelector(state, props),
      files: commentFilesSelector(state, props),
    };
  };
  return mapStateToProps;
};
export default connect(makeMapStateToProps)(CommentItem);
