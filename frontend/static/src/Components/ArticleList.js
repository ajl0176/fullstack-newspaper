import React, {Component} from 'react';


function ArticleItem(props){
  <div onClick={()=>}
}

function ArticleList(props) {
  const headliners = props.articles.filter(article => article.headliner).map(article => <Headliners key={article.id} article={article} readMore={props.readMore} />);
  const feature = props.articles.filter(article => !article.headliner).map(article => <Feature key={article.id} article={article} readMore={props.readMore} />);
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
        {feature}
      </div>
    </div>
  );
}

export default ArticleList;
