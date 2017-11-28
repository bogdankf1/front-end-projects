'use strict';

window.ee	=	new	EventEmitter();

var headers = ['Gadget', 'Year', 'Rating', 'Comments'];
var data = [['iPhone 7', '2015', '5', 'Good device, but weak battery.'],
            ['Samsung Galaxy Note 8', '2017', '5', 'Awesome camera, too big screen.'],
            ['Xiaomi Redmi 4X', '2016', '4', 'Nice price.']];

var Excel = React.createClass({
  displayName: 'Excel',

  propTypes: {
    headers: React.PropTypes.arrayOf(
      React.PropTypes.string
    ),
    initialData: React.PropTypes.arrayOf(
      React.PropTypes.arrayOf(
        React.PropTypes.string
      )
    ),
  },

  componentDidMount: function () {
    window.ee.addListener("Excel.add", function(item) {
      data.push(item);
      this.setState({data:data});
    });
  },

  componentWillUnmount: function () {
    window.ee.removeListener("Excel.add");
  },

  getInitialState: function() {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null,
      search: false,
    };
  },

  _sort: function(e) {
    var column = e.target.cellIndex;
    var data = this.state.data.slice();
    var descending = this.state.sortby === column && !this.state.descending;
    data.sort(function(a, b) {
      return descending
        ? a[column] < b[column]
        : a[column] > b[column];
    });
    this.setState({
      data: data,
      sortby: column,
      descending: descending,
    });
  },

  _showEditor: function(e) {
    this.setState({edit: {
      row: parseInt(e.target.dataset.row, 10),
      cell: e.target.cellIndex,
    }});
  },

  _save: function(e) {
    e.preventDefault();
    var input = e.target.firstChild;
    var data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;
    this.setState({
      edit: null,
      data: data,
    });
  },

  _preSearchData: null,

  _toggleSearch: function() {
    if (this.state.search) {
      this.setState({
        data: this._preSearchData,
        search: false,
      });
      this._preSearchData = null;
    } else {
      this._preSearchData = this.state.data;
      this.setState({
        search: true,
      });
    }
  },

  _search: function(e) {
    var needle = e.target.value.toLowerCase();
    if (!needle) {
      this.setState({data: this._preSearchData});
      return;
    }
    var idx = e.target.dataset.idx;
    var searchdata = this._preSearchData.filter(function (row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.setState({data: searchdata});
  },

  _renderSearch: function() {
    if (!this.state.search) {
      return null;
    }
    return (
      <tr onChange={this._search}>
        {this.props.headers.map(function(_ignore, idx) {
          return <td key={idx}><input type="text" data-idx={idx}/></td>;
        })}
      </tr>
    );
  },

  _download: function (format, ev) {
    var contents = format === 'json'
      ? JSON.stringify(this.state.data)
      : this.state.data.reduce(function(result, row) {
          return result
            + row.reduce(function(rowresult, cell, idx) {
                return rowresult
                  + '"'
                  + cell.replace(/"/g, '""')
                  + '"'
                  + (idx < row.length - 1 ? ',' : '');
              }, '')
            + "\n";
        }, '');

    var URL = window.URL || window.webkitURL;
    var blob = new Blob([contents], {type: 'text/' + format});
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;
  },

  _renderToolbar: function() {
    return (
      <div className="toolbar">
        <a className="Button" onClick={this._toggleSearch}>Search</a>
        <a className="Button Button-download" onClick={this._download.bind(this, 'json')}
          href="data.json">Export JSON</a>
        <a className="Button Button-download" onClick={this._download.bind(this, 'csv')}
          href="data.csv">Export CSV</a>
      </div>
    );
  },

  _renderTable: function() {
    return (
      <table>
        <thead onClick={this._sort}>
          <tr>{
            this.props.headers.map(function(title, idx) {
              if (this.state.sortby === idx) {
                title += this.state.descending ? ' \u2191' : ' \u2193';
              }
              return <th key={idx}>{title}</th>;
            }, this)
          }</tr>
        </thead>
        <tbody onDoubleClick={this._showEditor}>
          {this._renderSearch()}
          {this.state.data.map(function (row, rowidx) {
            return (
              <tr key={rowidx}>{
                row.map(function (cell, idx) {
                  var content = cell;
                  var edit = this.state.edit;
                  if (edit && edit.row === rowidx && edit.cell === idx) {
                    var content = (
                      <form onSubmit={this._save}>
                        <input className="form-control" type="text" defaultValue={cell} />
                      </form>
                    );
                  }
                  return <td key={idx} data-row={rowidx}>{content}</td>;
                }, this)}
              </tr>
            );
          }, this)}
        </tbody>
      </table>
    );
  },

  render: function() {
    return (
      <div className="Excel">
        {this._renderToolbar()}
        {this._renderTable()}
      </div>
    );
  },
});

var Logo = React.createClass ({
  render() {
    return <div className="Logo"  />;
  }
});

var Button = React.createClass ({
  propTypes: {
    value:React.PropTypes.string
  },

  _addItem:function() {

  },

  render:function() {
    return <a className="Button"
              onClick={this._addItem}
           >{this.props.value}
           </a>
  }
});

var Add = React.createClass({
  getInitialState:	function()	{
			return	{
					titleIsEmpty: true,
          yearIsEmpty: true,
          ratingIsEmpty: true,
          commentIsEmpty: true
			};
	},

  onBtnClickHandler:	function(e)	{
		e.preventDefault();
		var title = ReactDOM.findDOMNode(this.refs.title).value;
    var year = ReactDOM.findDOMNode(this.refs.year).value;
    var rating = ReactDOM.findDOMNode(this.refs.rating).value;
    var comment = ReactDOM.findDOMNode(this.refs.comment).value;

		var item = [title, year, rating, comment];
    console.log(item);
    data.push(item);
    console.log(data);
    window.ee.emit("Excel.add", item);
  },

  onFieldChange: function (fieldName, e) {
    if (e.target.value.trim().length	>	0)	{
			 this.setState({[""+fieldName]:false})
		}	else {
			 this.setState({[""+fieldName]:true})
		}
  },

  render: function () {
    var	titleIsEmpty	=	this.state.titleIsEmpty,
				yearIsEmpty	=	this.state.yearIsEmpty,
				ratingIsEmpty	=	this.state.ratingIsEmpty,
        commentIsEmpty = this.state.commentIsEmpty;
		return (
			<form className="Add">
				<input
					type="text"
					className="add-title form-control"
					placeholder="Title"
          onChange={this.onFieldChange.bind(this, "titleIsEmpty")}
					defaultValue=""
					ref="title"
				/>
        <input
          type="text"
          placeholder="Year"
          className="add-year form-control"
          onChange={this.onFieldChange.bind(this, "yearIsEmpty")}
          defaultValue=""
					ref="year"
        />
        <select
          type="text"
          placeholder="Rating"
          className="add-rating form-control"
          onChange={this.onFieldChange.bind(this, "ratingIsEmpty")}
          defaultValue=""
					ref="rating"
        > <option>{"5"}</option>
          <option>{"4"}</option>
          <option>{"3"}</option>
          <option>{"2"}</option>
          <option>{"1"}</option>
        </select>
        <input
          type="text"
          placeholder="Comment about gadget"
          className="add-comment form-control"
          onChange={this.onFieldChange.bind(this, "commentIsEmpty")}
          defaultValue=""
					ref="comment"
        />
				<button
        onClick={this.onBtnClickHandler}
        className="Button"
				 ref="add_button"
         disabled={titleIsEmpty	||	yearIsEmpty	||	ratingIsEmpty || commentIsEmpty}
				>Add</button>
			</form>
			);
	 }
});

ReactDOM.render(
  <div>
    <h1>
      <Logo /> Welcome to Gadgetpad!
    </h1>
    <Excel headers={headers} initialData={data} />
    <Button value={"Add"}/>
    <Add />
  </div>,
  document.getElementById('pad')
);
