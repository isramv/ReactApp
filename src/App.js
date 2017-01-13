import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import qs from 'qs'
import './App.css';

class App extends Component {

  componentDidMount() {
    // get auth token.
    if(localStorage.getItem('auth') === null) {
      axios.post('http://myapp.local/app_dev.php/api/login', qs.stringify({
        username: 'isramv',
        password: 'admin'
      })).then(response => {
        localStorage.setItem('auth', response.data.token);
        localStorage.setItem('username', response.data.username);
      }).catch(error => {
        console.error(error);
        localStorage.clear();
      });
    }
  }
  render() {
    let username = () => { 
        if(localStorage.getItem('username') !== null) {
          return localStorage.getItem('username');
        } else {
          return 'Annonymous';
        }
      };
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React: {username()}</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
