import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';

import './comment-form.sass';

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
            comment: null,
            editorState: EditorState.createEmpty(this.decorator),
            file: null,
            imagePreviewUrl: null

        }
        this.onChange = (editorState) => {
            this.setState({ editorState });
        };
        this.onBlur = () => {
            console.log('blur');
        }
        this.onFocus = () => {
            this.setState({ showSubmitButton: true});
        }
        this.toggleBlockType = (blockType) => {
            this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
        };
        this.onSubmit = () => {
            const { editorState } = this.state;
            const raw = convertToRaw(editorState.getCurrentContent());
            const rawJSON = JSON.stringify(raw);
            this.setState(
                { 
                    comment: rawJSON, 
                    editorState: EditorState.createEmpty(this.decorator),
                    showSubmitButton: false
                });
            this.props.addComment(rawJSON);
        };
        this.onChangeComment = (e) => {
            this.setState({
                comment: { text: e.target.value }
            });
        };
        this.handleKeyCommand = command => {
            const { editorState } = this.state;
            const newState = RichUtils.handleKeyCommand(
                editorState,
                command
            );
            if (newState) {
                this.onChange(newState);
                return "handled";
            }
            return "not-handled";
        };

        this.onCloseLinkForm = () => {
            this.setState({ showLinkForm: false });
        }
        this.onChangeLinkValue = (e) => {
            this.setState({
                linkValue: e.target.value
            });
        }
        this.onSubmitLink = (e) => {
            e.preventDefault();
            const { editorState, linkValue } = this.state;
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                { url: linkValue }
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
            this.setState({
                editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey)
            });
            this.onCloseLinkForm();
            
        }
        this.handleUploadFile = (e) => {
            
            e.preventDefault();
            const reader = new FileReader();
            const file = e.target.files[0];

            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
                console.log('File upload', this.state.file);
                console.log('File upload url', this.state.imagePreviewUrl);
            }
            reader.readAsDataURL(file)
        }

    }
    render() {
        const imagePreviewUrl = (!this.state.imagePreviewUrl) ? null : (<img src={ this.state.imagePreviewUrl } />);

        const linkForm = (!this.state.showLinkForm) ? null : (
            <form className='link-form' onSubmit={ this.onSubmitLink }>
                <input type='text' className='tag-form__input link-form__input' value={ this.state.value } 
                        placeholder='Введите ссылку' onChange={ this.onChangeLinkValue } />
                <span className='tag-form__close link-form__btn link-form__btn_add' onClick={ this.onSubmitLink }>+</span>
                <span className='tag-form__close link-form__btn link-form__btn_close' onClick={ this.onCloseLinkForm }>+</span>
            </form>
        )
        const submitButton = (!this.state.showSubmitButton) ? null :
            (<button className='comment-form__submit-btn' onClick={ this.onSubmit }>Сохранить</button>);
        const comment = (this.state.comment) ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.comment)), this.decorator) : this.state.editorState;
        return (
            <div className='comment-form'>
                <div className='comment-form__nav-bar'>
                    <button className='comment-form__btn comment-form__btn_bold' 
                        onClick={() => this.handleKeyCommand('bold')}></button>
                    <button className='comment-form__btn comment-form__btn_italic' 
                        onClick={() => this.handleKeyCommand('italic')}></button>
                    <button className='comment-form__btn comment-form__btn_underline' 
                        onClick={() => this.handleKeyCommand('underline')}>
                    </button>
                    <button className='comment-form__btn comment-form__btn_ul' 
                        onClick={(e) => this.toggleBlockType('unordered-list-item')}></button>
                    <button className='comment-form__btn comment-form__btn_ol' 
                        onClick={(e) => this.toggleBlockType('ordered-list-item')}></button>
                    <button className='comment-form__btn comment-form__btn_code'
                        onClick={(e) => this.toggleBlockType('code-block')}></button>
                    <button className='comment-form__btn comment-form__btn_link'
                        onClick={() => this.setState({ showLinkForm: true })}></button>
                    <button className='comment-form__btn comment-form__btn_file'
                        onClick={() => { }}></button> 
                </div>
                <div className='comment-form__editor-wrapper'>
                    <Editor editorState={ this.state.editorState } onChange={ this.onChange } onBlur={ this.onBlur }
                        placeholder='Напишите комментарий' handleKeyCommand={ this.handleKeyCommand } onFocus={ this.onFocus }/>
                    { linkForm }
                    { submitButton }
                    
                </div>
                <div>
                    <input type='file' onChange={ this.handleUploadFile } />
                    { imagePreviewUrl }
                    <a href={ this.state.imagePreviewUrl } target='_blank' download='myImage.png'>Link</a>

                </div>
            </div>    
        );
    }
}

const Link = (props) => {
    const { url } = props.contentState
      .getEntity(props.entityKey).getData();
  
    return (
        <a href={url} title={url} className="ed-link">
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
        callback
    );
}

export default CommentForm;