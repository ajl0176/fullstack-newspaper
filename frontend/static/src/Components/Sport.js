import React, {Component} from 'react';


function Feature(props) {
  return(
    <button type="button" className="list-group-item list-group-item-action font-weight-bold" onClick={() => props.readMore(props.article)}>{props.article.title}</button>
  )
}


function Headliners(props) {
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

function Sports(props){
  const headliners = props.articles.filter(article => article.headliner).map(article => <Headliners key={article.id} article={article} readMore={props.readMore} />);
  const feature = props.articles.filter(article => !article.headliner).map(article => <Feature key={article.id} article={article} readMore={props.readMore} />);
  return(
    <div className="row mt-3 mr-5 ml-5 no-gutters d-flex justify-content-around">
      <div className="col-7">
        <h3 className="category-header">Top Story</h3>
        <div className="list-group">
        {headliners}
        </div>
      </div>
      <div className="col-3">
        <h3 className="category-header">Feature Story</h3>
        {feature}
      </div>
    </div>
  );
}


export default Sports;
