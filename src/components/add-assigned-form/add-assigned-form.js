import React, { Component } from 'react';

import './add-assigned-form.sass';

class AddAssignedForm extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            showSelectList: false,
            selectedValue: ''
        };
        this.onChangeValue = (e) => {
            this.setState({ value: e.target.value });
        };
        this.onSubmitAssigned = (e) => {
            e.preventDefault();
            const fullName = this.state.selectedValue.lastName + ' ' + this.state.selectedValue.firstName;
            if (this.state.value === fullName) {
                this.props.updateTaskAddAssigned(this.state.selectedValue);
            }
        };
        this.onShowSelectList = () => {
            this.setState({ showSelectList: true });
        };
        this.onToggleSelectList = () => {
            this.setState((state) => {
                return { showSelectList: !state.showSelectList }
            })
        }
        this.searchUsers = () => {
            if (this.state.value === '') { return this.props.users }
            const filterUsers = this.props.users.filter((item) => {
                const fullName = item.lastName + ' ' + item.firstName;
                return fullName.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1;
            });
            return filterUsers;
        };
        this.onSelectValue = (user) => {
            const fullName = user.lastName + ' ' + user.firstName;
            this.setState(
                { 
                    value: fullName,
                    selectedValue: user,
                    showSelectList: false 
                }
            );
        };
        this.onDeleteAssignedUser = (user) => {
            this.props.updateTaskDeleteAssigned(user);
        }
    }
    render() {
        let listUsers, filteredUsers = null;
        let selectListIconClassNames = 'assigned-form__select-list-icon select-list__icon';
        if (this.state.showSelectList) {
            filteredUsers = (this.props.users && (this.props.users.length > 0)) 
                ? this.searchUsers() 
                : null;
            listUsers = (!filteredUsers || (filteredUsers.length < 1)) 
                ? null 
                : filteredUsers.map((user) => {
                    const userAssigned = !this.props.assigned ? null : this.props.assigned.find((assignedUser) => assignedUser.id === user.id);
                    const itemClassNames = !userAssigned 
                        ? 'assigned-form__select-list-item select-list__item select-list__item_active' 
                        : 'assigned-form__select-list-item select-list__item';
                    const handleFunction = !userAssigned ? () => { this.onSelectValue(user) } : () => {};
                    return (
                        <div key={ user.id } className={ itemClassNames } onClick={ handleFunction }>
                            { user.lastName + ' ' + user.firstName }
                            <span className='select-list__item-icon' onClick={ () => { this.onDeleteAssignedUser(user) } }></span>
                        </div>
                    )
            });
            selectListIconClassNames += ' select-list__icon_hide';
        }
        
        return (
            <form className='assigned-form' onSubmit={ this.onSubmitAssigned }>
                <span className='assigned-form__close' onClick={ this.props.onClose }>+</span>
                
                <div className='assigned-form__select-wrapper'>
                    <input type='text' className='assigned-form__input' value={ this.state.value } 
                        placeholder='Введите имя' onFocus={ this.onShowSelectList } 
                        onChange={ this.onChangeValue } />
                    <span className={ selectListIconClassNames } onClick={ this.onToggleSelectList }></span>
                    <div className='assigned-form__select-list-container'>
                        <div className='assigned-form__select-list'>
                            { listUsers }
                        </div>
                    </div>
                        
                </div>
                <input type='submit' className='assigned-form__add' value='Добавить'/>
            </form>
        );
    }
}

export default AddAssignedForm;