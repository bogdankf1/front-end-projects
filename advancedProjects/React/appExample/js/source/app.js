'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

//array of default news
var	my_news	=	[
		{
				author:	'Саша	Печкин',
				text:	'В	четчерг,	четвертого	числа...',
				bigText:	'в	четыре	с	четвертью	часа	четыре	чёрненьких	чумазеньких	чертёнка	чертили чёрными	чернилами	чертёж.'
		},
		{
				author:	'Просто	Вася',
				text:	'Считаю,	что	$	должен	стоить	35	рублей!',
				bigText:	'А	евро	42!'
		},
		{
				author:	'Гость',
				text:	'Бесплатно.	Скачать.	Лучший	сайт	-	http://localhost:3000',
				bigText:	'На	самом	деле	платно,	просто	нужно	прочитать	очень	длинное	лицензионное соглашение'
		}
];

//news item with text and author
class Article extends React.Component {
		render()	{
			var	author	=	this.props.data.author,
					text	=	this.props.data.text,
					bigText = this.props.data.bigText;

			return (
				<div className="Article">
						<p className="news-author">{author}:</p>
						<p className="news-text">{text}</p>
						<p className="news-bigText">{bigText}</p>
				</div>
			)
		}
}

//block of Article components
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

//block for case, when there are any news
class Comments extends React.Component {
  render() {
    return (
      <div className="Comments">
        Component Comments
      </div>
    );
  }
}

//full app block
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

//render for full app
ReactDOM.render(
  <App />,
  document.getElementById('app')
);
