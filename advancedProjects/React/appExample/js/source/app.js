//default news array
var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

window.ee	=	new	EventEmitter();

//Article component
var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },

  getInitialState: function() {
    return {
      visible: false
    };
  },

  readmoreClick: function(event) {
    event.preventDefault();
    this.setState({visible: true});
  },

  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;

    return (
      <div className='Article'>
        <p className='news-author'>{author}:</p>
        <p className='news-text'>{text}</p>
        <a href="#"
          onClick={this.readmoreClick}
          className={'news-readmore ' + (visible ? 'none': '')}>
          Подробнее
        </a>
        <p className={'news-bigText ' + (visible ? '': 'none')}>{bigText}</p>
      </div>
    )
  }
});

//TestInput component
var Add = React.createClass({
  getInitialState:	function()	{
			return	{
					agreeNotChecked: true,
          authorIsEmpty: true,
          textIsEmpty: true
			};
	},
	componentDidMount:	function()	{
			ReactDOM.findDOMNode(this.refs.author).focus();
	},
  onBtnClickHandler:	function(e)	{
		e.preventDefault();
		var	author	=	ReactDOM.findDOMNode(this.refs.author).value;
		var	addText	=	ReactDOM.findDOMNode(this.refs.text);

    var text = addText.value;
		var item = [{
      author: author,
      text: text,
      bigtext: "..."
    }];
    window.ee.emit("News.add", item);
    addText.value = "";
  },
  onCheckRuleClick:	function()	{
      this.setState({agreeNotChecked:	!this.state.agreeNotChecked});
	},
  onFieldChange: function (fieldName, e) {
    if (e.target.value.trim().length	>	0)	{
			 this.setState({[""+fieldName]:false})
		}	else {
			 this.setState({[""+fieldName]:true})
		}
  },
	render: function () {
    var	agreeNotChecked	=	this.state.agreeNotChecked,
				authorIsEmpty	=	this.state.authorIsEmpty,
				textIsEmpty	=	this.state.textIsEmpty;
		return (
			<form className="Add">
				<input
					type="text"
					className="add-author"
					placeholder="Your name"
          onChange={this.onFieldChange.bind(this, "authorIsEmpty")}
					defaultValue=""
					ref="author"
				/>
				<textarea
					className="add-text"
					placeholder="News text"
          onChange={this.onFieldChange.bind(this, "textIsEmpty")}
					defaultValue=""
					ref="text"
				></textarea>
				<label className="add-checkrule">
          <input type="checkbox"
    			 onChange={this.onCheckRuleClick}
           ref="checkrule"/>I agree with rules
        </label>
				<button
        onClick={this.onBtnClickHandler}
        className="add-btn"
				 ref="add_button"
         disabled={agreeNotChecked	||	authorIsEmpty	||	textIsEmpty}
				>Add</button>
			</form>
			);
	 }
});

//News component
var News = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },

  render: function() {
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>
    }

    return (
      <div className='News'>
        {newsTemplate}
        <strong className={'news-count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
      </div>
    );
  }
});

//App component
var App = React.createClass({
  getInitialState: function () {
    return {
      news:my_news
    };
  },
  componentDidMount: function () {
    var self = this;
    window.ee.addListener("News.add", function (item) {
      var nextNews = item.concat(self.state.news);
      self.setState({news:nextNews});
    });
  },
  componentWillUmount: function () {
    window.ee.removeListener("News.add");
  },
  render: function() {
    return (
      <div className='App'>
        <h3>Новости</h3>
				<Add />
        <News data={this.state.news} />
      </div>
    );
  }
});

//Render full app
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
