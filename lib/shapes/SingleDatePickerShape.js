Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _OrientationShape = require('../shapes/OrientationShape');

var _OrientationShape2 = _interopRequireDefault(_OrientationShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = {
  id: _react.PropTypes.string.isRequired,
  placeholder: _react.PropTypes.string,
  date: _reactMomentProptypes2['default'].momentObj,
  focused: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,

  onDateChange: _react.PropTypes.func,
  onFocusChange: _react.PropTypes.func,

  isDayBlocked: _react.PropTypes.func,
  isOutsideRange: _react.PropTypes.func,
  enableOutsideDays: _react.PropTypes.bool,
  numberOfMonths: _react.PropTypes.number,
  orientation: _OrientationShape2['default'],

  // portal options
  withPortal: _react.PropTypes.bool,
  withFullScreenPortal: _react.PropTypes.bool,

  onPrevMonthClick: _react.PropTypes.func,
  onNextMonthClick: _react.PropTypes.func,

  // i18n
  displayFormat: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  monthFormat: _react.PropTypes.string,
  phrases: _react.PropTypes.shape({
    closeDatePicker: _react.PropTypes.node
  })
};