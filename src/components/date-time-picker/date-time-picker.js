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
      value: this.props.value ? moment(this.props.value) : null,
    };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(date) {
    this.setState({ value: date});
  }

  onBlur() {
    const { value, prevValue } = this.state;
    const date = (value && (typeof value.toDate === 'function'))
      ? value.toDate().getTime()
      : value;
    const prevDate = prevValue
      ? prevValue.toDate().getTime()
      : null;
    if (date !== prevDate) {
      if (Number.isInteger(date)){
        this.props.updateTaskAddDateDue(value.toDate());
        this.setState({ prevValue: value });
      } else if (prevDate){
        this.setState(
          { value: null, prevValue: null },
        );
        this.props.updateTaskAddDateDue(null);
      } else {
        this.setState({ value: null });
      }
    }
  }

  render() {
    const formatValue = this.state.value || 'Установить дату';
    return (
      <div className="date-time-picker">
        <Datetime
          onChange={this.onChange}
          value={formatValue}
          dateFormat="D MMM"
          onBlur={this.onBlur}
        />
      </div>
    );
  }

}

export default DateTimePicker;
