import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import qs from 'qs'
import './App.css';
import ListOfGists from './Components/ListOfGists'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      auth: '',
      gists: []
    }
    this.getGists = this.getGists.bind(this);
  }

  getGists() {

    const config = {
      headers: {
        'x-custom-auth': this.state.auth
      }
    }

    axios.get('http://myapp.local/app_dev.php/api/v1/gists', config)
      .then(response => {
        console.log(response);
        this.setState({ gists: response.data });
      }).catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    // get auth token.
    if(localStorage.getItem('auth') === null) {
      axios.post('http://myapp.local/app_dev.php/api/login', qs.stringify({
        username: 'isramv',
        password: 'admin'
      })).then(response => {
        this.setState({ auth: response.data.token });
        localStorage.setItem('auth', response.data.token);
        localStorage.setItem('username', response.data.username);
      }).catch(error => {
        console.error(error);
        localStorage.clear();
      });
    } else {
      this.setState({ auth: localStorage.getItem('auth') });
    }
  }

  render() {
    const username = () => { 
      if(localStorage.getItem('username') !== null) {
        return localStorage.getItem('username');
      } else {
        return 'Annonymous';
      }
    };
    const listOfGists = <ListOfGists 
                        getGists={this.getGists} 
                        gists={this.state.gists}/>
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome: {username()}</h2>
        </div>
        <div className="App-intro">
          {listOfGists}
        </div>
      </div>
    );
  }
}

export default App;
