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
        this.setState({ gists: response.data });
      }).catch(error => {
        console.log(error);
      });
  }

  componentWillMount() {
    // get auth token.
    if(localStorage.getItem('auth') === null) {
      axios.post('http://myapp.local/app_dev.php/api/login', qs.stringify({
        username: 'isramv',
        password: 'admin'
      })).then(response => {
        this.setState({ auth: response.data.token });
        localStorage.setItem('auth', response.data.token);
        localStorage.setItem('username', response.data.username);
        this.getGists();
      }).catch(error => {
        console.error(error);
        localStorage.clear();
      });
    } else {
      this.setState({ auth: localStorage.getItem('auth') });
    }
  }

  componentDidMount() {
    this.getGists();
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
                          gists={this.state.gists}
                          />
    return (
      <div className="App container-fluid">
        <div className="AppHeader row">
          <h3>Welcome: {username()}</h3>
        </div>
        <div className="row">
          <div className="AppList col-xs-3">
            {listOfGists}
          </div>
          <div className="AppMain col-xs-9">
            {this.props.children}
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
