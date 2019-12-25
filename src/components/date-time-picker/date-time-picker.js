import React, { Component } from 'react';
import * as moment from 'moment';
import Datetime from 'react-datetime';

import 'react-datetime/css/react-datetime.css';
import './date-time-picker.sass';

class DateTimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevValue: this.props.value ? moment(this.props.value) : null,
            value: this.props.value ? moment(this.props.value) : null
        };
        this.onChange = (date) => {
            this.setState({ value: date});
        };
        this.onBlur = () => {
            const date = (this.state.value && (typeof this.state.value.toDate === 'function'))
                ? this.state.value.toDate().getTime()
                : this.state.value
            const prevDate = this.state.prevValue
                ? this.state.prevValue.toDate().getTime()
                : this.state.prevValue
            if (date !== prevDate) {
                if (Number.isInteger(date)){
                    this.props.updateTaskAddDateDue(this.state.value.toDate());
                    this.setState({ prevValue: this.state.value});
                }
                else if (prevDate){
                    this.setState(
                        { value: null, prevValue: null }
                    );
                    this.props.updateTaskAddDateDue(null);
                }
                else {
                    this.setState({ value: null});
                }
            }
        };
    }
    render() {
        const formatValue = !this.state.value ? 'Установить дату' : this.state.value;
        return (    
            <div className='date-time-picker'>
                <Datetime onChange={ this.onChange } value={ formatValue } 
                    dateFormat='D MMM' onBlur={ this.onBlur }/>
            </div>
        )
    }

}

export default DateTimePicker;