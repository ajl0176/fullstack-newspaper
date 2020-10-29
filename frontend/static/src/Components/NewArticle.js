import React, { Component } from 'react';

class NewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      author:'',
      category: '',
      status: '',
      headliner: false,
    }
    this.handleInput = this.handleInput.bind(this);
    this.toggleHeadLiner = this.toggleHeadLiner.bind(this);
  }

  handleInput(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleHeadLiner(event) {
    this.setState({ headliner: !this.state.headliner, });
  }

  render() {
    return(
      <form className="mt-3 mr-5 ml-5" onSubmit={(event) => this.props.handleSubmit(event, this.state)}>
        <div className="form-group">
          <label htmlFor="title" className="font-weight-bold">Title</label>
          <input className="form-control mb-3" type="text" id="title" placeholder="Title" name="title" onChange={this.handleInput}/>
          <label htmlFor="body" className="font-weight-bold">Body</label>
          <textarea className="form-control mb-3" rows="10" id="body" placeholder="Body" name="body" onChange={this.handleInput}></textarea>
          <span className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={this.toggleHeadLiner}/>
            <label className="form-check-label font-weight-bold font-italic" for="exampleCheck1">Headliner</label>
          </span>
          <label htmlFor="category" className="font-weight-bold">Category</label>
          <select className="form-control" id="category" name="category" onChange={this.handleInput}>
            <option>Select Category</option>
            <option value="ED">Editorial</option>
            <option value="ET">Entertainment</option>
            <option value="SP">Sports</option>
          </select>
          <label htmlFor="status" className="font-weight-bold">Status</label>
          {localStorage.is_staff === 'true' ?
            <React.Fragment>
              <select className="form-control" id="status" name="status" onChange={this.handleInput}>
                <option>Select Status</option>
                <option value="DFT">Draft</option>
                <option value="SUB">Submit</option>
                <option value="PUB">Publish</option>
              </select>
            </React.Fragment>
          : <React.Fragment>
              <select className="form-control" id="status" name="status" onChange={this.handleInput}>
                <option>Select Status</option>
                <option value="DFT">Draft</option>
                <option value="SUB">Submit</option>
              </select>
            </React.Fragment>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>
    )
  }
}

export default NewArticle;
