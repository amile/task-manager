import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, CompositeDecorator } from 'draft-js';

import CommentFormButton from '../comment-form-button/comment-form-button';

import './comment-form.sass';

const inlineTypesButton = [
  { type: 'bold'},
  { type: 'italic'},
  { type: 'underline'},
];

const blockTypesButton = [
  { type: 'unordered-list-item'},
  { type: 'ordered-list-item'},
  { type: 'code-block'},
];

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
    this.state = {
      showLinkForm: false,
      showSubmitButton: false,
      linkValue: '',
      editorState: EditorState.createEmpty(this.decorator),
      files: [],
      filePreviewUrl: null,
    };
    this.onShowLinkForm = this.onShowLinkForm.bind(this);
    this.onFileUploadRef = this.onFileUploadRef.bind(this);

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
    this.onBlur = () => {
      const { editorState, files } = this.state;
      const raw = convertToRaw(editorState.getCurrentContent());
      const blockMapHasText = raw.blocks.filter((item) => {
        return item.text.length > 0;
      });
      if ((blockMapHasText.length === 0) && (files.length === 0)) {
        this.setState({ showSubmitButton: false});
      }
    };
    this.onFocus = () => {
      this.setState({ showSubmitButton: true});
    };
    this.toggleBlockType = (blockType) => {
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };
    this.onSubmit = () => {
      const { editorState, files } = this.state;
      const raw = convertToRaw(editorState.getCurrentContent());
      const blockMapHasText = raw.blocks.filter((item) => {
        return item.text.length > 0;
      });

      this.setState(
        {
          editorState: EditorState.createEmpty(this.decorator),
          showSubmitButton: false,
          files: [],
        });
      if ((blockMapHasText.length > 0) || (files.length > 0)) {
        const rawJSON = (blockMapHasText.length > 0)
          ? JSON.stringify(raw)
          : null;
        this.props.addComment(rawJSON, files);
      }
    };
    this.handleKeyCommand = command => {
      const { editorState } = this.state;
      const newState = RichUtils.handleKeyCommand(
        editorState,
        command,
      );
      if (newState) {
        this.onChange(newState);
        return "handled";
      }
      return "not-handled";
    };

    this.onCloseLinkForm = () => {
      this.setState({ showLinkForm: false });
    };
    this.onChangeLinkValue = (e) => {
      this.setState({
        linkValue: e.target.value,
      });
    };
    this.onSubmitLink = (e) => {
      e.preventDefault();
      const { editorState, linkValue } = this.state;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        { url: linkValue },
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
      this.setState({
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey),
      });
      this.onCloseLinkForm();

    };
    this.handleUploadFile = (e) => {
      e.preventDefault();
      this.onFocus();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState((state) => {
          return {
            files: [
              ...state.files,
              { name: file.name, url: reader.result, type: file.type },
            ],
          };
        });
      };
      reader.readAsDataURL(file);
    };
    this.handleDeleteFile = (name) => {
      const idx = this.state.files.findIndex((file) => { return name === file.name; });
      const newFiles = [ ...this.state.files.slice(0, idx), ...this.state.files.slice(idx + 1)];
      this.setState({files: newFiles});
    };

  }

  onFileUploadRef() {
    this.fileUploadRef.click();
  }

  onShowLinkForm() {
    this.setState({ showLinkForm: true });
  }

  checkInlineTypes(type) {
    const inlineStyles = this.state.editorState.getCurrentInlineStyle();
    return inlineStyles.has(type.toUpperCase());
  }

  checkBlockTypes(type) {
    const currentBlockType = RichUtils.getCurrentBlockType(this.state.editorState);
    return currentBlockType === type;
  }

  render() {
    const linkForm = (!this.state.showLinkForm) ? null : (
      <form className="link-form" onSubmit={this.onSubmitLink}>
        <input
          type="text"
          className="tag-form__input link-form__input"
          value={this.state.value}
          placeholder="http://"
          onChange={this.onChangeLinkValue}
        />
        <span
          className="tag-form__close link-form__btn link-form__btn_add"
          onClick={this.onSubmitLink}
        >
          +
        </span>
        <span
          className="tag-form__close link-form__btn link-form__btn_close"
          onClick={this.onCloseLinkForm}
        >
          +
        </span>
      </form>
    );
    const submitButton = (!this.state.showSubmitButton)
      ? null
      : (
        <button
          className="comment-form__submit-btn"
          onClick={this.onSubmit}
        >
          Сохранить
        </button>
      );
    const filesLinkList = (this.state.files.length === 0)
      ? null
      : this.state.files.map((file, idx) => {
        return (
          <div key={idx} className="comment-form__load-file">
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              download={file.name}
            >
              {file.name}
            </a>
            <span className="comment-form__load-file-cancel" onClick={() => {this.handleDeleteFile(file.name);}}> +</span>
          </div>
        );
      });
    const inlineButtons = inlineTypesButton.map((item) => {
      return (
        <div key={item.type} className="comment-form__item">
          <CommentFormButton
            type={item.type}
            active={this.checkInlineTypes(item.type)}
            onClick={this.handleKeyCommand}
          />
        </div>
      );
    });
    const blockButtons = blockTypesButton.map((item) => {
      return (
        <div key={item.type} className="comment-form__item">
          <CommentFormButton
            type={item.type}
            active={this.checkBlockTypes(item.type)}
            onClick={this.toggleBlockType}
          />
        </div>
      );
    });
    return (
      <div className="comment-form">
        <div className="comment-form__nav-bar">
          {inlineButtons}
          {blockButtons}
          <button
            key="link"
            className="comment-form__btn comment-form__btn_link"
            onClick={this.onShowLinkForm}
          />
          <button
            key="file"
            className="comment-form__btn comment-form__btn_file"
            onClick={this.onFileUploadRef}
          >
            <input
              type="file"
              id="upload-file"
              value=""
              onChange={this.handleUploadFile}
              ref={(ref) => { this.fileUploadRef = ref; }}
            />
          </button>
        </div>
        <div className="comment-form__editor-wrapper">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Напишите комментарий"
            handleKeyCommand={this.handleKeyCommand}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          {linkForm}
          <div className="comment-form__files-wrapper">
            {filesLinkList}
          </div>
          {submitButton}
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
        (entityKey !== null) &&
          (contentState.getEntity(entityKey).getType() === 'LINK')
      );
    },
    callback,
  );
}

export default CommentForm;
