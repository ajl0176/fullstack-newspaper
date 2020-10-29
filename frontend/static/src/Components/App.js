import React, { Component } from 'react';
import './index.css';
import Cookies from 'js-cookie';

// import Editorials from './Editorials';
// import Entertainment from './Entertainment';
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
        loggedin: Cookies.get('Authorization'),
        display: 'articles',

}
      this.fetchArticles = this.fetchArticles.bind(this);
      this.handlePost = this.handlePost.bind(this);
      this.registeration = this.registeration.bind(this);
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

    async logIn(e, obj){
        e.preventDefault();

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
        }
      }

    async handlePost(e, obj){
        e.preventDefault();
        const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': Cookies.get('csrftoken'),
           },
           body: JSON.stringify(obj)
         };

      const handleError = (err) => console.warn(err);
      const response = await fetch('/api/v1/articles/', options);
      const data = await response.json().catch(handleError);

      if(data.key){
      Cookies.set('Authorization', `Token ${data.key}`)
         }

       }
       async registeration(e, obj){
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
                  this.setState({page: 'login'});
                }

              }

              render(){
                let html;
                const display = this.state.display;

                if (display === 'register'){
                  html = <Register registerUser={this.registerUser}/>
                } else if (display === 'login') {
                  html = <Login logIn={this.logIn}/>
                } else if (display === 'articles') {
                  html = <ArticleList articles={this.state.articles} />
                }

                  return(
                    <React.Fragment>
                      <div>{html}</div>
                    </React.Fragment>
                  );
                  }
                }


              export default App;
