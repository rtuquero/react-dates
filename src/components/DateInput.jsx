import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

import isTouchDevice from '../utils/isTouchDevice';

const propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string, // also used as label
  dateValue: PropTypes.string,
  focused: PropTypes.bool,
  disabled: PropTypes.bool,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDownShiftTab: PropTypes.func,
  onKeyDownTab: PropTypes.func,
};

const defaultProps = {
  placeholder: 'Select Date',
  dateValue: '',
  focused: false,
  disabled: false,

  onChange() {},
  onFocus() {},
  onKeyDownShiftTab() {},
  onKeyDownTab() {},
};

export default class DateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateString: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.isTouchDevice = isTouchDevice();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.dateValue && nextProps.dateValue) {
      this.setState({
        dateString: '',
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { focused } = this.props;
    if (prevProps.focused !== focused && focused) {
      const startDateInput = ReactDOM.findDOMNode(this.inputRef);
      startDateInput.focus();
      startDateInput.select();
    }
  }

  onChange(e) {
    const dateString = e.target.value;

    this.setState({ dateString });
    this.props.onChange(dateString);
  }

  onKeyDown(e) {
    const { onKeyDownShiftTab, onKeyDownTab } = this.props;
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        onKeyDownShiftTab(e);
      } else {
        onKeyDownTab(e);
      }
    }
  }

  render() {
    const { dateString } = this.state;
    const {
      id,
      placeholder,
      dateValue,
      focused,
      onFocus,
      disabled,
    } = this.props;

    let value = dateValue || dateString;
    const arrDate = value.split('-');
    if (arrDate.length > 1) {
      value = (
        <span className="DateInput__display-date">
          <span className="DateInput__display-date--day">{arrDate[0]}</span>
          <span className="DateInput__display-date--month">{arrDate[1]}</span>
          <span className="DateInput__display-date--year">{arrDate[2]}</span>
        </span>
      );
    }

    return (
      <div
        className={cx('DateInput', {
          'DateInput--disabled': disabled,
        })}
        onClick={onFocus}
      >
        <label className="DateInput__label" htmlFor={id}>
          {placeholder}
        </label>

        <input
          className="DateInput__input"
          type="text"
          id={id}
          name={id}
          ref={(ref) => { this.inputRef = ref; }}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete="off"
          maxLength={10}
          disabled={disabled || this.isTouchDevice}
        />

        <div
          className={cx('DateInput__display-text', {
            'DateInput__display-text--has-input': !!value,
            'DateInput__display-text--focused': focused,
            'DateInput__display-text--disabled': disabled,
          })}
        >
          {value || placeholder}
        </div>
      </div>
    );
  }
}

DateInput.propTypes = propTypes;
DateInput.defaultProps = defaultProps;
