import React from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import 'moment/locale/ru';

import { makeCommentCreatedByUserSelector } from '../../selectors';

import './comment-item.sass';

moment.locale('ru');

const CommentItem = ({ comment, user }) => {
    
    return (
        <div>
            <div className='comment__created-info'>
                <div className='comment__user'>
                    <span className='comment__user-icon user-icon'>
                        { user.firstName.slice(0, 1) }{ user.lastName.slice(0, 1) }
                    </span>
                    { user.firstName } { user.lastName }
                </div>
                <div className='comment__date list__item-date'>{ moment(comment.date).format('DD MMMM YYYY, h:mm') }</div>
            </div>
            <div className='comment__label'>{ comment.label }</div>
        </div>
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