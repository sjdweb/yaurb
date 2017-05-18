import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class renderDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.input.onChange(moment(date).format('YYYY-MM-DD'));
  }

  render() {
    const {
      input, placeholder,
      meta: { touched, error },
    } = this.props;

    return (
      <div>
        <DatePicker
          {...input}
          placeholder={placeholder}
          dateFormat="YYYY-MM-DD"
          selected={input.value ? moment(input.value, 'YYYY-MM-DD') : null}
          onChange={this.handleChange}
        />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
}

renderDatePicker.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.bool,
  }),
  placeholder: PropTypes.string,
};

renderDatePicker.defaultProps = {
  placeholder: '',
  meta: { touched: false, error: false },
};

export default renderDatePicker;
