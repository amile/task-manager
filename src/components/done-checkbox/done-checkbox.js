import React, { Component } from 'react';

import './done-checkbox.sass';

class DoneCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: this.props.done
        }
        this.handleCheckbox = (e) => {
            const done = e.target.checked;
            this.props.handleCheckbox(done);
            this.setState({ done })
        }
    }
    render() {
        return (
            <label onClick={ (e) => e.stopPropagation() }>
                <input className='checkbox' type='checkbox' 
                    checked={ this.state.done } onChange={ this.handleCheckbox }/>
            </label>
        )
    }
}

export default DoneCheckbox;
