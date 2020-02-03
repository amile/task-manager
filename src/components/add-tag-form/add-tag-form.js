import React, { Component } from 'react';

import ColorItem from '../list-color-item';

import './add-tag-form.sass';
import SelectListItem from '../select-list-item';

const colorKeys = ['red', 'violet', 'blue', 'green', 'yellow'];

class AddTagForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      setColor: colorKeys[0],
      colorKeys: colorKeys,
      showSelectList: false,
      selectedValue: '',
    };
    this.onSetColor = this.onSetColor.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onSubmitTag = this.onSubmitTag.bind(this);
    this.onShowSelectList = this.onShowSelectList.bind(this);
    this.onToggleSelectList = this.onToggleSelectList.bind(this);
    this.onSelectValue = this.onSelectValue.bind(this);
  }

  onSetColor(key) {
    if (
      !this.state.selectedValue.label
      || (this.state.value !== this.state.selectedValue.label)
    ) {
      this.setState({ setColor: key });
    }
  }

  onChangeValue(e) {
    this.setState({ value: e.target.value });
  }

  onSubmitTag(e) {
    e.preventDefault();
    const { value, selectedValue } = this.state;
    if (value === selectedValue.label) {
      this.props.updateTaskAddTag(selectedValue.id);
    } else if (value.length > 0) {
      this.props.addTag(value, this.state.setColor);
    }
  }

  onShowSelectList() {
    this.setState({ showSelectList: true });
  }

  onToggleSelectList() {
    this.setState((state) => {
      return { showSelectList: !state.showSelectList };
    });
  }

  searchTags() {
    if (this.state.value === '') { return this.props.tags; }
    const filterTags = this.props.tags.filter((item) => {
      return item.label
        .toLowerCase()
        .indexOf(this.state.value.toLowerCase()) > -1;
    });
    return filterTags;
  }

  onSelectValue(tag) {
    if (tag === 'new') {
      this.setState({ showSelectList: false });
    } else {
      this.setState(
        {
          value: tag.label,
          setColor: tag.color,
          selectedValue: tag,
          showSelectList: false,
        },
      );
    }
  }

  render() {
    const listColors = this.state.colorKeys.map((key) => {
      return (
        <ColorItem
          key={key}
          color={key}
          active={key === this.state.setColor}
          onSetColor={this.onSetColor}
        />
      );
    });
    let filteredTags, listTags, newTag;
    let selectListIconClassNames = 'tag-form__select-list-icon select-list__icon';
    if (this.state.showSelectList) {
      newTag = (this.state.value.length === 0)
        ? ''
        : (
          <SelectListItem
            key="new"
            item="new"
            classNames="select-list__item_active"
            onClick={this.onSelectValue}
          >
            {this.state.value} (new)
          </SelectListItem>
        );
      filteredTags = (this.props.tags && (this.props.tags.length > 0))
        ? this.searchTags()
        : null;
      listTags = (!filteredTags || (filteredTags.length < 1))
        ? null
        : this.searchTags().map((tag) => {
          if (tag.label === this.state.value) {
            newTag = '';
          }
          const tagAdded = !this.props.taskTags
            ? null
            : this.props.taskTags.find((taskTag) => (taskTag.id === tag.id));
          const itemClassNames = !tagAdded
            ? 'select-list__item_active'
            : '';
          const handleFunction = !tagAdded
            ? this.onSelectValue
            : null;
          return (
            <SelectListItem
              key={tag.id}
              item={tag}
              classNames={itemClassNames}
              onClick={handleFunction}
            >
              {tag.label}
            </SelectListItem>
          );
        });
      selectListIconClassNames += ' select-list__icon_hide';
    }
    let selectListClassNames = this.state.showSelectList
      ? 'tag-form__select-list'
      : 'tag-form__select-list display_none';
    return (
      <form
        className="tag-form"
        onSubmit={this.onSubmitTag}
      >
        <span
          className="tag-form__close"
          onClick={this.props.onClose}
        >
          +
        </span>
        <div className="tag-form__select-wrapper">
          <input
            type="text"
            className="tag-form__input"
            value={this.state.value}
            placeholder="Новый тег"
            onFocus={this.onShowSelectList}
            onChange={this.onChangeValue}
          />
          <span
            className={selectListIconClassNames}
            onClick={this.onToggleSelectList}
          />
          <div className={selectListClassNames}>
            {newTag}
            {listTags}
          </div>
        </div>
        <div className="list-color">
          {listColors}
        </div>
        <input
          type="submit"
          className="tag-form__add"
          value="Добавить"
        />
      </form>
    );
  }
}

export default AddTagForm;
