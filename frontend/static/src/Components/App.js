import React, { Component } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import Login from './Login';
import Register from './Register';

import ArticleList from './ArticleList';
import ArticleForm from './ArticleForm';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      title: [],
      loggedIn: Cookies.get('Authorization')? true: false,
      display: 'all',

    }
   this.fetchArticles = this.fetchArticles.bind(this);
   this.handleClick = this.handleClick.bind(this);
   this.registerUser = this.registerUser.bind(this);
   this.logIn = this.logIn.bind(this);
   this.logOut = this.logOut.bind(this);
    }

  componentDidMount(){
   this.fetchArticles();
    }

  fetchArticles(){
    fetch ('api/v1/articles/')
      .then (response => response.json())
      .then (data => this.setState({articles: data}))
      .catch (error => console.log ('Error:', error));
    }

    handleClick(html) {
      this.setState({display: html})

}
  async logIn(e, obj, reg){
    e.preventDefault();
    if(reg){
      this.setState({display: 'register'});
    }else{

  const options = {
    method: 'POST',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Content-Type': 'application/json'
       },
      body: JSON.stringify(obj)
      };

  const handleError = (err) => console.warn(err);
  const response = await fetch('api/v1/rest-auth/login/', options)
  const data = await response.json().catch(handleError)

   if(data.key){
    Cookies.set('Authorization', `Token ${data.key}`);
    this.setState({loggedin: true});
    localStorage.setItem('is_staff', data.is_staff);
    this.setState({display: 'login'})
    console.log(data.is_staff);
    console.log(localStorage.getItem('is_staff'));
     }
   }
}

  async registerUser(e, obj){
    e.preventDefault();

  const options = {
    method: 'POST',
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
      'Content-Type': 'application/json'
      },
    body: JSON.stringify(obj),
      };

  const handleError = (err) => console.warn(err);
  const response = await fetch('api/v1/rest-auth/registration/', options)
  const data = await response.json().catch(handleError)

    if(data.key){
    Cookies.set('Authorization', `Token ${data.key}`);
      this.setState({loggedin: true});
      this.setStage({display: 'register'})
      }
  }

  async logOut(e){
    e.preventDefault();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
        },
      };

  const handleError = (err) => console.warn(err);
  const response = await fetch('/api/v1/rest-auth/logout/', options);
  const data = await response.json().catch(handleError);

  if(data.detail === "Successfully logged out."){
    Cookies.remove('Authorization');
      this.setState({display: 'articles'});
      this.setState({loggedin: false});
      localStorage.removeItem('is_staff');
      }
    }

  render(){
    let html;
    const display = this.state.display;

    if (display === 'register'){
      html = <Register registerUser={this.registerUser}/>
  } else if (display === 'login') {
      html = <Login logIn={this.logIn}/>
  } else  {
      html = <ArticleList articles={this.state.articles} filter={this.state.display}/>
  }

     return(
        <React.Fragment>
         <div>
           <nav className="navbar navbar-dark bg-dark container-fluid">
             <div>
               <button className="btn" type='button' onClick={() => this.handleClick('all')}>Home</button>
               <button className="btn" type='button' onClick={() => this.handleClick('Entertainment')}>Entertainment</button>
               <button className="btn" type='button' onClick={() => this.handleClick('Sports')}>Sports</button>
               <button className="btn" type='button' onClick={() => this.handleClick('Editorials')}>Editorials</button>
               <button className="btn" type='button' onClick= {() => this.handleClick('login')}>Log In</button>
               <button className="btn" type='button' onClick= {() => this.handleClick('register')}>Register</button>
               <div className="heading">
                 <h1 className="title">THE CODING CHRONICLES</h1>
               </div>
               <div>{html}</div>
            </div>
          </nav>
        </div>
      </React.Fragment>
        );
      }
    }


export default App;
