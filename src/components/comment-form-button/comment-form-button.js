import React from 'react';

const CommentFormButton = ({type, active, onClick}) => {
    const activeClassName = active ? 'active' : '';
    return (
        <button 
            className={`comment-form__btn comment-form__btn_${ type } ${ activeClassName }`} 
            onClick={ () => onClick(type) }>
        </button>
    )
}

export default CommentFormButton;