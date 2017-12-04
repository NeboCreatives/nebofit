import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

//Component Imports
import Home from './Components/Home/Home'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Home/>
      </div>
    );
  }
}

export default App;
