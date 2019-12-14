import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, CompositeDecorator } from 'draft-js';
import * as moment from 'moment';
import 'moment/locale/ru';

import { makeCommentCreatedByUserSelector } from '../../selectors';

import './comment-item.sass';

moment.locale('ru');

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
        const { user, comment } = this.props;
        console.log('comment files', comment.files)
        const label = EditorState.createWithContent(convertFromRaw(JSON.parse(comment.label)), this.decorator);
        return (
            <div className='comment__wrapper'>
                <div className='comment__created-info'>
                    <div className='comment__user'>
                        <span className='comment__user-icon user-icon'>
                            { user.firstName.slice(0, 1) }{ user.lastName.slice(0, 1) }
                        </span>
                        { user.firstName } { user.lastName }
                    </div>
                    <div className='comment__date list__item-date'>{ moment(comment.date).format('DD MMMM YYYY, HH:mm') }</div>
                </div>
                <div className='comment__label'><Editor editorState={ label } readOnly={true} /></div>
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

const makeMapStateToProps = () => {
    const commentCreatedByUserSelector = makeCommentCreatedByUserSelector();
    const mapStateToProps = (state, props) => {
        return {
            user: commentCreatedByUserSelector(state, props),
        }
    }
    return mapStateToProps;  
};
export default connect(makeMapStateToProps)(CommentItem);