import React from 'react';

import './add-button.sass';

const AddButton = ({ label, onAdd }) => {
    let buttonLabel = '';
    if (label === 'group') {
        buttonLabel = '+ Новая группа';
    } else if (label === 'task') {
        buttonLabel = '+ Новая задача'; 
    }
    return (
        <button className={`btn add-btn add-btn_${label}`} onClick={ onAdd }>{ buttonLabel }</button>
    );
}

export default AddButton;