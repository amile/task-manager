import React, { Component } from 'react';

import './add-tag-form.sass';

const colorKeys = ['red', 'violet', 'blue', 'green', 'yellow']

class AddTagForm extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            setColor: colorKeys[0],
            colorKeys: colorKeys,
            showSelectList: false,
            selectedValue: ''
        };
        this.state.onSetColor = (key) => {
            if (!this.state.selectedValue.label || (this.state.value !== this.state.selectedValue.label)) {
                this.setState({ setColor: key });
            }
        };
        this.onChangeValue = (e) => {
            this.setState({ value: e.target.value });
        };
        this.onSubmitTag = (e) => {
            e.preventDefault();
            const { value, selectedValue } = this.state;
            if (value === selectedValue.label) {
                this.props.updateTaskAddTag(selectedValue.id);
            } 
            else if (value.length > 0) {
                this.props.addTag(value, this.state.setColor);
            }
        };
        this.onShowSelectList = () => {
            this.setState({ showSelectList: true });
        };
        this.onToggleSelectList = () => {
            this.setState((state) => {
                return { showSelectList: !state.showSelectList }
            });
        };
        this.searchTags = () => {
            if (this.state.value === '') { return this.props.tags }
            const filterTags = this.props.tags.filter((item) => {
                return item.label.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1;
            });
            return filterTags;
        }
        this.onSelectValue = (tag) => {
            if (!tag) {
                this.setState({showSelectList: false});
            } else {
                this.setState(
                    { 
                        value: tag.label,
                        setColor: tag.color, 
                        selectedValue: tag,
                        showSelectList: false 
                    }
                );
            }
        };
    }
    render() {
        const listColors = this.state.colorKeys.map((key) => {
            const classNameActive = (key === this.state.setColor) ? 'list-color__item_active' : '';
            return (
                <div key = {key} className={`list-color__item list-color__item_${ key } ${ classNameActive }`}
                    onClick={ () => { this.state.onSetColor(key) }}>
                </div>
            );
        });
        let filteredTags, listTags, newTag;
        let selectListIconClassNames = 'tag-form__select-list-icon select-list__icon';
        if (this.state.showSelectList) {
            newTag = (this.state.value.length === 0) ? '' :
                (<div key='new' className='select-list__item select-list__item_active' 
                    onClick={ (e) => {  this.onSelectValue(false) }}>
                    { this.state.value } (new)
                </div>);
            filteredTags = (this.props.tags && (this.props.tags.length > 0)) ? this.searchTags() : null;
            listTags = (!filteredTags || (filteredTags.length < 1)) ? null : this.searchTags().map((tag) => {
                if (tag.label === this.state.value) { newTag = '' }
                const tagAdded = !this.props.taskTags ? null : this.props.taskTags.find((taskTag) => taskTag.id === tag.id);
                const itemClassNames = !tagAdded ? 'select-list__item select-list__item_active' : 'select-list__item';
                const handleFunction = !tagAdded ? () => { this.onSelectValue(tag) } : () => {};
                return (
                    <div key={ tag.id } className={ itemClassNames } onClick={ handleFunction }>
                        { tag.label }
                        <span className='select-list__item-icon'></span>
                    </div>
                )
            });
            selectListIconClassNames += ' select-list__icon_hide'
        }
        let selectListClassNames = this.state.showSelectList ? 'tag-form__select-list' : 'tag-form__select-list display_none';
        return (
            <form className='tag-form' onSubmit={ this.onSubmitTag }>
                <span className='tag-form__close' onClick={ this.props.onClose }>+</span>
                
                <div className='tag-form__select-wrapper'>
                    <input type='text' className='tag-form__input' value={ this.state.value } 
                        placeholder='Новый тег' onFocus={ this.onShowSelectList } 
                        onChange={ this.onChangeValue } />
                    <span className={ selectListIconClassNames } onClick={ this.onToggleSelectList }></span>
                    <div className={ selectListClassNames }>
                        { newTag }
                        { listTags }
                    </div>
                </div>
                <div className='list-color'>
                    { listColors }
                </div>
                <input type='submit' className='tag-form__add' value='Добавить'/>
            </form>
        );
    }
}

export default AddTagForm;