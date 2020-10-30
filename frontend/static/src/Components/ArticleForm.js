import React, { Component } from 'react';
import Cookies from 'js-cookie';



class ArticleForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: '',
      category: '',
      status: ('Draft', 'Status')
    }
      this.handleChange = this.handleChange.bind(this)
  }


  handleChange (event){
    this.setState({[event.target.name]: event.target.value});
  }

  addArticle(event){
    event.preventDefault();

  const csrftoken = Cookies.get('csrftoken');

  fetch('/api/v1/articles/', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      'X-CSRFToken': csrftoken,
    },
       body: JSON.stringify(this.state)
    });
  };

  render() {
    return (
      <React.Fragment>
        <form className="news-form" onSubmit={(event) => {this.addArticle(event, this.state); this.setState({title:'', body:''})}}>
          <div className="left">
            <div className="form-group">
              <label htmlFor='title'className="news-title">Title</label>
              <input type="text" id='title' name="title" value={this.state.title} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor='category'className="news-title">Category</label>
              <select className="news-option" id="category" name="category" value={this.state.category} onChange={this.handleChange}>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="editorials">Editorials</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status" className="news-title">Status</label>
              <select className="news-option" id="status" name="status" value={this.state.status} onChange={this.handleChange}>
                <option value="Draft">Draft</option>
                <option value="Submit">Submitted</option>
              </select>
            </div>
            </div>
            <div className="right">
              <div className="body">
                <label htmlFor="body"className="news-body">Body</label>
                <textarea name="body" className="news-text" rows="5" id='body' value={this.state.body} onChange={this.handleChange}/>
              </div>
              <button type="submit"className="sub btn btn-dark">Submit</button>
          </div>
        </form>
      </React.Fragment>

    )
  }
}
export default ArticleForm;
