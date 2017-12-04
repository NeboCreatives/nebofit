import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

//Component Imports
import Home from './Components/Home/Home'

class App extends Component {

  getData(){
    axios.get('/profile.json')
      .then( res => console.log(res))
  }

  render() {
    return (
      <div className="App">
        <a href={ 'http://localhost:8080/authorize' }>
          <button>Login</button>
        </a>
        <button onClick={this.getData} >Get data</button>
        <Home/>
      </div>
    );
  }
}

export default App;
