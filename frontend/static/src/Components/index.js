import React, { Component } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import ArticleForm from './ArticleForm';
import Editorials from './Editorials';
import Entertainment from './Entertainment';
import Login from './Login';
import ArticleList from './ArticleList';
import Register from './Register';
import Sport from './Sport';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      title: [],
      page: 'articles',    }


    this.fetchUserArticles = this.fetchUserArticles.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleSelection(selection) {
    if (selection === 'myArticle'){
      this.fetchUserArticles();
    }
    this.setState({page: selection});
  }


  componentDidMount() {
    if(Cookies.get('Authorization')) {
      this.fetchUserArticles();
    } else {
      this.fetchArticles();
    }
  }

  fetchArticles() {
    fetch('api/v1/articles/')
      .then(response => response.json())
      .then(data => this.setState({articles: data}))
      .catch(error => console.log('Error:', error));
  }

  fetchUserArticles() {
    fetch('/api/v1/articles/user/')
    .then(response => response.json())
    .then(data => this.setState({articles: data}))
    .catch(error => console.log('Error:', error));
  }


  handleSubmit(event, data){
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken')
    console.log('data', data);
    fetch('/api/v1/articles/', {
      method: 'POST',
      headers: {
        'X-CRSFToken': csrftoken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(data => {
      const articles = [...this.state.articles, data]
      this.setState({ articles })
    })
    .catch(error => console.log('Error:', error));
  }

  async handleEdit(event, data) {
    event.preventDefault();
    const csrftoken = Cookies.get('csrftoken');
    fetch(`/api/v1/aricles/${data.id}/`, {
      method: 'PUT',
      headers: {
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      const articles = [...this.state.articles, data]
      this.setState({ articles })
    })
    .catch(error => console.log('Error:', error));
  }

 async handleRegistration(event, obj) {
   event.preventDefault();

   const options = {
     method: 'POST',
     headers: {
       'Content-Type': 'applications/json',
       'X-CSRFToken': Cookies.get('csrftoken'),
     },
     body: JSON.stringify(obj),
   };

   const handleError =  (err) => console.warn(err);
   const response = await fetch('/api/v1/rest-auth/registration/', options);
   const data = await response.json().catch(handleError);

   if(data.key) {
     Cookies.set('Authorization', `Token${data}`);
     localStorage.setItem('is_staff', data.is_staff)
     this.returnHome();
   }
 }

async handleLogin(event, obj) {
  event.preventDefault();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
    body: JSON.stringify(obj),
  };
  const handleError =  (err) => console.warn(err);
  const response = await fetch('/api/v1/rest-auth/login/', options);
  const data = await response.json().catch(handleError);

  if(data.key) {
    Cookies.set('Authorization', `Token${data}`);
    this.setState({loggedIn: true});
    localStorage.setItem('is_staff', data.is_staff);
    this.returnHome();
  }
  }

  async handleLogout(event) {
    const options = {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    const handleError =  (err) => console.warn(err);
    const response = await fetch('/api/v1/rest-auth/logout/', options);
    const data = await response.json().catch(handleError);

    if(data.detail === "Successfully Logged Out") {
      Cookies.remove('Authorization');
      this.setState({loggedIn: false});
      localStorage.removeItem('is_staff', data.is_staff);
      this.returnHome();
    }
  }
