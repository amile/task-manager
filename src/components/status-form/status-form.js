import React, { Component } from 'react';

import { statusList } from '../../utils';

import './status-form.sass';

class StatusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
    };
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus(e) {
    this.props.changeStatus(e.target.value);
    this.setState({ status: e.target.value });
  }

  render() {
    const { status } = this.state;
    const selectClassNames = 'status-form__select status-form__select_' + status;
    const selectIconClassNames = 'status-form__select-icon status-form__select-icon_' + status;
    const options = Object.keys(statusList).map((key) => {
      return (
        <option
          key={key}
          value={key}
        >
          {statusList[key]}
        </option>
      );
    });
    return (
      <form className="status-form">
        <span className={selectIconClassNames} />
        <select
          className={selectClassNames}
          value={status}
          onChange={this.changeStatus}
        >
          {options}
        </select>
      </form>
    );
  }
}

export default StatusForm;
