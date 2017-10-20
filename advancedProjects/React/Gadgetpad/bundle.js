(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//import Excel from './components/Excel';
//import React from 'react';
//import ReactDOM from 'react-dom';
//import Logo from './components/Logo';


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headers = localStorage.getItem('headers');
var data = localStorage.getItem('data');

if (!headers) {
  headers = ['Title', 'Year', 'Rating', 'Comments'];
  data = [['Test', '2015', '3', 'meh']];
}

var Excel = React.createClass({
  displayName: 'Excel',

  propTypes: {
    headers: React.PropTypes.arrayOf(React.PropTypes.string),
    initialData: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string))
  },

  getInitialState: function getInitialState() {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null, // [row index, cell index],
      search: false
    };
  },

  _sort: function _sort(e) {
    var column = e.target.cellIndex;
    var data = this.state.data.slice();
    var descending = this.state.sortby === column && !this.state.descending;
    data.sort(function (a, b) {
      return descending ? a[column] < b[column] : a[column] > b[column];
    });
    this.setState({
      data: data,
      sortby: column,
      descending: descending
    });
  },

  _showEditor: function _showEditor(e) {
    this.setState({ edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex
      } });
  },

  _save: function _save(e) {
    e.preventDefault();
    var input = e.target.firstChild;
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data: data
    });
  },

  _preSearchData: null,

  _toggleSearch: function _toggleSearch() {
    if (this.state.search) {
      this.setState({
        data: this._preSearchData,
        search: false
      });
      this._preSearchData = null;
    } else {
      this._preSearchData = this.state.data;
      this.setState({
        search: true
      });
    }
  },

  _search: function _search(e) {
    var needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({ data: this._preSearchData });
      return;
    }
    var idx = e.target.dataset.idx;
    var searchdata = this._preSearchData.filter(function (row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.setState({ data: searchdata });
  },

  _download: function _download(format, ev) {
    var contents = format === 'json' ? JSON.stringify(this.state.data) : this.state.data.reduce(function (result, row) {
      return result + row.reduce(function (rowresult, cell, idx) {
        return rowresult + '"' + cell.replace(/"/g, '""') + '"' + (idx < row.length - 1 ? ',' : '');
      }, '') + "\n";
    }, '');

    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], { type: 'text/' + format });
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'Excel' },
      this._renderToolbar(),
      this._renderTable()
    );
  },

  _renderToolbar: function _renderToolbar() {
    return React.createElement(
      'div',
      { className: 'toolbar' },
      React.createElement(
        'button',
        { onClick: this._toggleSearch },
        'Search'
      ),
      React.createElement(
        'a',
        { onClick: this._download.bind(this, 'json'),
          href: 'data.json' },
        'Export JSON'
      ),
      React.createElement(
        'a',
        { onClick: this._download.bind(this, 'csv'),
          href: 'data.csv' },
        'Export CSV'
      )
    );
  },

  _renderSearch: function _renderSearch() {
    if (!this.state.search) {
      return null;
    }
    return React.createElement(
      'tr',
      { onChange: this._search },
      this.props.headers.map(function (_ignore, idx) {
        return React.createElement(
          'td',
          { key: idx },
          React.createElement('input', { type: 'text', 'data-idx': idx })
        );
      })
    );
  },

  _renderTable: function _renderTable() {
    return React.createElement(
      'table',
      null,
      React.createElement(
        'thead',
        { onClick: this._sort },
        React.createElement(
          'tr',
          null,
          this.props.headers.map(function (title, idx) {
            if (this.state.sortby === idx) {
              title += this.state.descending ? ' \u2191' : ' \u2193';
            }
            return React.createElement(
              'th',
              { key: idx },
              title
            );
          }, this)
        )
      ),
      React.createElement(
        'tbody',
        { onDoubleClick: this._showEditor },
        this._renderSearch(),
        this.state.data.map(function (row, rowidx) {
          return React.createElement(
            'tr',
            { key: rowidx },
            row.map(function (cell, idx) {
              var content = cell;
              var edit = this.state.edit;
              if (edit && edit.row === rowidx && edit.cell === idx) {
                var content = React.createElement(
                  'form',
                  { onSubmit: this._save },
                  React.createElement('input', { type: 'text', defaultValue: cell })
                );
              }
              return React.createElement(
                'td',
                { key: idx, 'data-row': rowidx },
                content
              );
            }, this)
          );
        }, this)
      )
    );
  }
});

var Logo = function (_React$Component) {
  _inherits(Logo, _React$Component);

  function Logo() {
    _classCallCheck(this, Logo);

    return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
  }

  _createClass(Logo, [{
    key: 'render',
    value: function render() {
      return React.createElement('div', { className: 'Logo' });
    }
  }]);

  return Logo;
}(React.Component);

ReactDOM.render(React.createElement(
  'div',
  null,
  React.createElement(
    'h1',
    null,
    React.createElement(Logo, null),
    ' Welcome to Gadgetpad!'
  ),
  React.createElement(Excel, { headers: headers, initialData: data })
), document.getElementById('pad'));
},{}]},{},[1]);
