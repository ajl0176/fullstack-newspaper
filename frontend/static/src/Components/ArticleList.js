import React, {Component} from 'react';

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
                <button type="button" className="btn btn-success" onClick={()=>this.props.readMore(this.props.article)}>Read More</button>
            </div>
          </ul>
        </div>
    </main>

    );
  }
}

function Feature(props) {
  return(
    <button type="button" className="list-group-item list-group-item-action font-weight-bold" onClick={() => props.readMore(props.article)}>{props.article.title}</button>
  )
}


function Headliner(props) {
  return(
    <button type="button" className="list-group-item list-group-item-action" onClick={() => props.readMore(props.article)}>
      <div>
        <img className="article-image" src={props.article.image} alt="Article" />
      </div>
      <h4 className="category-title font-weight-bold article-title">{props.article.title}</h4>
      <div id="headliner" className="category-body">
        <p>{props.article.body}</p>
      </div>
    </button>
  )
}

class ArticleList extends Component{

  render(){

  // this.props.articles.forEach(article => console.log('headliner', article.headliners))
  const headliners = this.props.articles
    .filter(article => article.headliners)
    .map(article => <Headliner key={article.id} article={article} readMore={this.props.readMore} />);

  const features = this.props.articles
    .filter(article => !article.headliners)
    .map(article => <Feature key={article.id} article={article} readMore={this.props.readMore} />);

  return(
    <div className="row mt-3 mr-5 ml-5 no-gutters d-flex justify-content-around">
      <div className="col-7">
        <h3 className="category-header">Headliners</h3>
        <div className="list-group">
        {headliners}
        </div>
      </div>
      <div className="col-3">
        <h3 className="category-header">Feature</h3>
        {features}
      </div>
    </div>
    );
  }
}
export default ArticleList;
