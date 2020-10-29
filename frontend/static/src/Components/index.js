import React, { Component } from 'react';
import './index.css';
import Cookies from 'js-cookie';
import NewArticle from './NewArticle';
import Editorials from './Editorials';
import Entertainment from './Entertainment';
import Login from './Login';
import Articleinfull from './Articleinfull';
import NewsList from './NewsList';
import Register from './Register';
import Sport from './Sport';



class Components extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      button: 'home',
      loggedIn: Cookies.get('Authorization')? true:false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.returnHome = this.returnHome.bind(this);
    this.renderEntertainment = this.renderEntertainment.bind(this);
    this.renderEditorials = this.renderEditorials.bind(this);
    this.renderSports = this.renderSports.bind(this);


  }

  componentDidMount(){
    fetch('/api/v1/articles/')
      .then(res => res.json())
      .then(data => this.setState({articles: data}))
      .catch(error => console.log('Error: ', error));
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
returnHome(){
  this.setState({button:'home'});
}
renderEntertainment(){
  this.setState({button: 'entertainment'})
}
renderEditorials(){
  this.setState({button: 'editorials'})
}
renderSports(){
  this.setState({button: 'sports'})
}
renderreadMore(){
  this.setState({button: 'readMore'});
  window.scrollTo({
    top:0,
  });
}

  render() {
    const loggedIn = this.state.loggedIn;
    const button = this.state.button;
    let page;
    if (button === 'home') {
     page = <NewsList readMore={this.readMore} articles={this.state.articles.filter(article => article.status === 'PUB')} />
   } else if (button === 'entertainment') {
     page = <Entertainment readMore={this.readMore} articles={this.state.articles.filter(article => article.category === 'ET')} />
   } else if (button === 'editorials') {
     page = <Editorials readMore={this.readMore} articles={this.state.articles.filter(article => article.category === 'ED')} />
   } else if (button === 'sports') {
     page = <Sport readMore={this.readMore} articles={this.state.articles.filter(article => article.category === 'SP')} />
   } else if (button === 'newArticle') {
     page = <NewArticle handleSubmit={this.handleSubmit} />
   } else if (button === 'register') {
     page = <Register handleRegistration={this.handleRegistration} />
   } else if (button === 'login') {
     page = <Login handleLogin={this.handleLogin} />
   } else if (button === 'readMore') {
     page = <ArticleDetails article={this.state.article} />
   }

return (
  <div className="container-fluid">
    <React.Fragment>

      <div>
      <h1>THE CODING CHRONICLES</h1>
        <nav>
            <button className ="navbar" onClick={this.returnHome}>Home</button>
            <button type="button" classname="btn" onClick={this.renderEntertainment}>Entertainment</button>
            <button type="button" classname="btn" onClick={this.renderEditorials}>Editorials</button>
            <button type="button" classname="btn" onClick={this.renderSports}>Sports</button>

            <button type="button" classname="btn" onClick={this.handleRegistration}>Register</button>
            <button type="button" classname="btn" onClick={this.handleLogin}>Login</button>

        </nav>
        </div>
        </React.Fragment>
      }
      </div>
      )
    }
}
 export default Components;
