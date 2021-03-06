import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

class ArticleItem extends Component  {

  constructor(props){
    super(props);
    this.state = {
    }

  }

  render(){
    return (
      <main className="article-wrapper">
        <div className="container">
          <ul className="article-list">
            <div className="list-group-item list-group-item-action">
              <div className="row ">
                <h5 className="col-10 ">{this.props.article.title}</h5>
                <h5 className="col-2">${this.props.article.author}</h5>
              </div>
                <p className="col-md-auto mb-1"> {this.props.body}</p>

            </div>
          </ul>
        </div>
    </main>

    );
  }
}

function Feature(props) {
  return(
    // <button type="button" className="list-group-item list-group-item-action font-weight-bold" onClick={() => props.readMore(props.article)}>{props.article.title}</button>
    <div className="list-group-item list-group-item-action">
    <h4 className="category-title font-weight-bold article-title">{props.article.title}</h4>
    <button className="btn btn-small" type="button"  onClick={()=>(props.article.title)}>Read More</button>
    </div>
  )
}

function Headliner(props) {
  return(
    <div className="list-group-item list-group-item-action">
      <h4 className="category-title font-weight-bold article-title">{props.article.title}</h4>
      <div id="headliner" className="category-body">
        <p>{props.article.body}</p>
        </div>
        <button className="btn btn-small" type="button" onClick={()=>(props.article.title)}>Read More</button>
    </div>
  )
}

class ArticleList extends Component{

constructor(props){
 super(props)
  this.state = {
   category: 'Editorials',
   title: '',
   body: '',
   articleDisplay: {},
 }
 this.handleClick = this.handleClick.bind(this);
}

handleClick(category) {
   this.setState({display: category});
}

handleModal(display){
  const articleId = this.props.articles.findIndex(x => x.id === display)
  this.setState({articleDisplay: this.props.articles[articleId]})
  this.setState({show: !this.state.show});
}

  render(){


    // this.props.articles.forEach(article => console.log('headliner', article.headliners))

    const articles = this.props.articles
      .filter(article => this.props.filter !== 'all' ? article.category === this.props.filter : article)

    const headliners = articles
      .filter(article => article.headliners)
      .map(article => <Headliner key={article.id} article={article} readMore={this.props.readMore} />);

    const features = articles
      .filter(article => !article.headliners)
      .map(article => <Feature key={article.id} article={article} readMore={this.props.readMore} />);


  return(
<React.Fragment>
    <div className="container">
      <div className="row">
        <div className="col-headliners">
          <h3 className="category-header-headliners">Headliners</h3>
          <div className="list-group-headliners">
          {headliners}
        </div>
      </div>
      <div className="col-features">
        <h3 className="category-header-features">Features</h3>
        <div className="list-group-features">
        {features}
        </div>
      </div>
      </div>
    </div>


  </React.Fragment>

    );
  }
}
export default ArticleList;
