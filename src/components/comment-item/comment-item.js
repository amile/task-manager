import React from 'react';
import { connect } from 'react-redux';

import { makeCommentCreatedByUserSelector } from '../../selectors';

const CommentItem = ({ comment, user }) => {
    return (
        <div>
            <div className='comment__createdBy'>
                <span className='comment__createdBy-icon'>
                    { user.firstName.slice(0, 1) }{ user.lastName.slice(0, 1) }
                </span>
                { user.firstName } { user.lastName }
            </div>
            <div className='comment__createdDate'>{ comment.date }</div>
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