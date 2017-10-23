'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//array of default news
var my_news = [{
  author: 'Саша	Печкин',
  text: 'В	четчерг,	четвертого	числа...',
  bigText: 'в	четыре	с	четвертью	часа	четыре	чёрненьких	чумазеньких	чертёнка	чертили чёрными	чернилами	чертёж.'
}, {
  author: 'Просто	Вася',
  text: 'Считаю,	что	$	должен	стоить	35	рублей!',
  bigText: 'А	евро	42!'
}, {
  author: 'Гость',
  text: 'Бесплатно.	Скачать.	Лучший	сайт	-	http://localhost:3000',
  bigText: 'На	самом	деле	платно,	просто	нужно	прочитать	очень	длинное	лицензионное соглашение'
}];

//news item with text and author

var Article = function (_React$Component) {
  _inherits(Article, _React$Component);

  function Article() {
    _classCallCheck(this, Article);

    return _possibleConstructorReturn(this, (Article.__proto__ || Object.getPrototypeOf(Article)).apply(this, arguments));
  }

  _createClass(Article, [{
    key: 'render',
    value: function render() {
      var author = this.props.data.author,
          text = this.props.data.text,
          bigText = this.props.data.bigText;

      return _react2.default.createElement(
        'div',
        { className: 'Article' },
        _react2.default.createElement(
          'p',
          { className: 'news-author' },
          author,
          ':'
        ),
        _react2.default.createElement(
          'p',
          { className: 'news-text' },
          text
        ),
        _react2.default.createElement(
          'p',
          { className: 'news-bigText' },
          bigText
        )
      );
    }
  }]);

  return Article;
}(_react2.default.Component);

//block of Article components


var News = function (_React$Component2) {
  _inherits(News, _React$Component2);

  function News() {
    _classCallCheck(this, News);

    return _possibleConstructorReturn(this, (News.__proto__ || Object.getPrototypeOf(News)).apply(this, arguments));
  }

  _createClass(News, [{
    key: 'render',
    value: function render() {
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
          'Any news to date'
        );
      }
      return _react2.default.createElement(
        'div',
        { className: 'News' },
        'Component News',
        newsTemplate
      );
    }
  }]);

  return News;
}(_react2.default.Component);

//block for case, when there are any news


var Comments = function (_React$Component3) {
  _inherits(Comments, _React$Component3);

  function Comments() {
    _classCallCheck(this, Comments);

    return _possibleConstructorReturn(this, (Comments.__proto__ || Object.getPrototypeOf(Comments)).apply(this, arguments));
  }

  _createClass(Comments, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Comments' },
        'Component Comments'
      );
    }
  }]);

  return Comments;
}(_react2.default.Component);

//full app block


var App = function (_React$Component4) {
  _inherits(App, _React$Component4);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'App' },
        'Component App',
        _react2.default.createElement(News, { data: my_news }),
        _react2.default.createElement(Comments, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

//render for full app


_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));