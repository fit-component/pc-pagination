'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_React$Component) {
    _inherits(Pagination, _React$Component);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Pagination).call(this, props));

        _this.state = {
            currentPage: _this.props.defaultPage,
            activeButtonName: ''
        };
        return _this;
    }

    // 外部调用翻页


    _createClass(Pagination, [{
        key: 'jump',
        value: function jump(page) {
            var activeButtonName = undefined;
            if (page === this.state.currentPage) return;

            if (page > this.state.currentPage) {
                if (!this.props.next) {
                    return;
                }
                activeButtonName = 'after';
            }

            if (page < this.state.currentPage) {
                activeButtonName = 'before';
            }

            this.handleChange(page, false, activeButtonName);
        }

        // 翻页

    }, {
        key: 'handleChange',
        value: function handleChange(page, disable, activeButtonName) {
            var _this2 = this;

            if (disable) return;
            this.setState({
                currentPage: page,
                activeButtonName: activeButtonName
            }, function () {
                _this2.props.onChange(page);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var beforeClass = (0, _classnames2.default)({
                'before': true,
                'disabled': this.state.currentPage === 1 || this.props.loading
            });

            var afterClass = (0, _classnames2.default)({
                'after': true,
                'disabled': !this.props.next || this.props.loading
            });

            var beforeLoading = null;
            var afterLoading = null;

            switch (this.state.activeButtonName) {
                case 'before':
                    if (!this.props.loading) break;
                    beforeLoading = _react2.default.createElement('i', { className: 'fa fa-circle-o-notch fa-spin loading' });
                    break;
                case 'after':
                    if (!this.props.loading) break;
                    afterLoading = _react2.default.createElement('i', { className: 'fa fa-circle-o-notch fa-spin loading' });
                    break;
            }

            return _react2.default.createElement(
                'nav',
                { className: 'lib-pc-pagination-lib-pagination' },
                _react2.default.createElement(
                    'ul',
                    { className: 'pager' },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'span',
                            { onClick: this.handleChange.bind(this, this.state.currentPage - 1, this.state.currentPage === 1 || this.props.loading, 'before'),
                                className: beforeClass },
                            beforeLoading ? beforeLoading : null,
                            '上一页'
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'span',
                            { onClick: this.handleChange.bind(this, this.state.currentPage + 1, !this.props.next || this.props.loading, 'after'),
                                className: afterClass },
                            '下一页',
                            afterLoading ? afterLoading : null
                        )
                    )
                )
            );
        }
    }]);

    return Pagination;
}(_react2.default.Component);

exports.default = Pagination;


Pagination.defaultProps = {
    // @desc 初始分页数
    defaultPage: 1,

    // @desc 修改分页的回调
    onChange: function onChange() {},

    // @desc 是否在loading
    loading: false,

    // @desc 是否有下一页
    next: false
};