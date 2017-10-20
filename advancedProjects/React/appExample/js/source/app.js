'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

var	my_news	=	[
		{
				author:	'Саша	Печкин',
				text:	'В	четверг,	четвертого	числа...'
		},
		{
				author:	'Просто	Вася',
				text:	'Считаю,	что	$	должен	стоить	35	рублей!'
		},
		{
				author:	'Гость',
				text:	'Бесплатно.	Скачать.	Лучший	сайт	-	http://localhost:3000'
		}
];
class Article extends React.Component {
		render()	{
			var	author	=	this.props.data.author,
					text	=	this.props.data.text;
			return (
				<div className="Article">
						<p className="news-author">{author}:</p>
						<p className="news-text">{text}</p>
				</div>
			)
		}
}

class News extends React.Component {
  render() {
    var data = this.props.data;
    var newsTemplate
    if(data.length > 0) {
     newsTemplate = data.map(function (item, index) {
      return (
        <div key={index}>
          <Article data={item}/>
        </div>
      );
    });
    } else {
       newsTemplate = <p>Any news to date</p>;
    }
    return (
      <div className="News" >
        Component News{newsTemplate}
      </div>
    );
  }
}

class Comments extends React.Component {
  render() {
    return (
      <div className="Comments">
        Component Comments
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        Component App
        <News data={my_news}/>
        <Comments />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
