'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//array of default news
var my_news = [{
  author: 'Саша Печкин',
  text: 'В четчерг, четвертого числа...',
  bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
}, {
  author: 'Просто Вася',
  text: 'Считаю, что $ должен стоить 35 рублей!',
  bigText: 'А евро 42!'
}, {
  author: 'Гость',
  text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
  bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
}];

var Article = _react2.default.createClass({
  displayName: 'Article',

  // propTypes: {
  //   data: React.PropTypes.shape({
  //     author: React.PropTypes.string.isRequired,
  //     text: React.PropTypes.string.isRequired,
  //     bigText: React.PropTypes.string.isRequired
  //   })
  // },
  getInitialState: function getInitialState() {
    return {
      visible: false
    };
  },
  readmoreClick: function readmoreClick(e) {
    e.preventDefault();
    this.setState({ visible: true });
  },
  render: function render() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;

    return _react2.default.createElement(
      'div',
      { className: 'article' },
      _react2.default.createElement(
        'p',
        { className: 'news__author' },
        author,
        ':'
      ),
      _react2.default.createElement(
        'p',
        { className: 'news__text' },
        text
      ),
      _react2.default.createElement(
        'a',
        { href: '#',
          onClick: this.readmoreClick,
          className: 'news__readmore ' + (visible ? 'none' : '') },
        '\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435'
      ),
      _react2.default.createElement(
        'p',
        { className: 'news__big-text ' + (visible ? '' : 'none') },
        bigText
      )
    );
  }
});

var News = _react2.default.createClass({
  displayName: 'News',

  propTypes: {
    data: _react2.default.PropTypes.array.isRequired
  },
  render: function render() {
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map(function (item, index) {
        return _react2.default.createElement(
          'div',
          { key: index },
          _react2.default.createElement(Article, { data: item })
        );
      });
    } else {
      newsTemplate = _react2.default.createElement(
        'p',
        null,
        '\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E \u043D\u043E\u0432\u043E\u0441\u0442\u0435\u0439 \u043D\u0435\u0442'
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'news' },
      newsTemplate,
      _react2.default.createElement(
        'strong',
        { className: 'news__count ' + (data.length > 0 ? '' : 'none') },
        '\u0412\u0441\u0435\u0433\u043E \u043D\u043E\u0432\u043E\u0441\u0442\u0435\u0439: ',
        data.length
      )
    );
  }
});

var App = _react2.default.createClass({
  displayName: 'App',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'app' },
      _react2.default.createElement(
        'h3',
        null,
        '\u041D\u043E\u0432\u043E\u0441\u0442\u0438'
      ),
      _react2.default.createElement(News, { data: my_news })
    );
  }
});

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('root'));