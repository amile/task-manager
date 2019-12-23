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
            files: [],
            filePreviewUrl: null

        }
        this.onChange = (editorState) => {
            this.setState({ editorState });
            console.log('change', editorState)
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
            const { editorState, files } = this.state;
            const raw = convertToRaw(editorState.getCurrentContent());
            console.log('submit comment', raw)
            const rawJSON = JSON.stringify(raw);
            this.setState(
                { 
                    comment: rawJSON, 
                    editorState: EditorState.createEmpty(this.decorator),
                    showSubmitButton: false,
                    files: []
                });
            this.props.addComment(rawJSON, files);
        };
        this.onChangeComment = (e) => {
            this.setState({
                comment: { text: e.target.value }
            });
            console.log('change comment', this.state.comment)
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
                this.setState((state) => {
                    return {
                        files: [...state.files, {name: file.name, url: reader.result, type: file.type}]
                    }
            });
            }
            reader.readAsDataURL(file)
        }
        this.handleDeleteFile = (name) => {
            const idx = this.state.files.findIndex((file) => { return name === file.name });
            const newFiles = [ ...this.state.files.slice(0, idx), ...this.state.files.slice(idx + 1)];
            this.setState({files: newFiles});
        }

    }
    render() {
        let imageList = null;
        if (this.state.files.length > 0) {
            imageList = this.state.files.map((file) => {
                const imageType = file.type.startsWith('image/');
                const image = (!imageType) ? null : (<img className='file-img' src={ file.url } />);
                return (
                    <div className='file-wrapper'>
                        { image }
                        <div className='file-label'>
                            { file.name }
                            <span className='file-label-download'>Загрузить</span>
                            <span className='file-label-delete'>+</span>
                        </div>
                    </div>
                );
            })

        }

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
        const filesLinkList = (this.state.files.length === 0) ? null : this.state.files.map((file) => {
            return (
                <div className='comment-form__load-file'>
                    <a href={ file.url } target='_blank' download={ file.name }>{ file.name }</a>
                    <span className='comment-form__load-file-cancel' onClick={() => {this.handleDeleteFile(file.name)} }> +</span>
                </div>
            );
        });
        const comment = EditorState.createEmpty(this.decorator);
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
                        onClick={() => {this.fileUploadRef.click()}}>
                        <label for='upload-file'>
                            <input type='file' id='upload-file' ref={ (ref)=>{this.fileUploadRef = ref} }
                            value='' onChange={ this.handleUploadFile } />
                        </label>
                        
                    </button> 
                </div>
                <div className='comment-form__editor-wrapper'>
                    <Editor editorState={ this.state.editorState } onChange={ this.onChange }
                        placeholder='Напишите комментарий' handleKeyCommand={ this.handleKeyCommand } onFocus={ this.onFocus }/>
                    { linkForm }
                    <div className='comment-form__files-wrapper'>
                        { filesLinkList }
                    </div>
                    
                    { submitButton }
                    
                </div>
                <div>
                    { imageList }
                    <Editor editorState={ comment } readOnly/>
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