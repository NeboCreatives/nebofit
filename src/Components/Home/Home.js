import React, { Component } from "react";
import axios from 'axios';

class Home extends Component {

    getData(){
        axios.get('/profile.json')
          .then( res => console.log(res))
      }

  render() {
    return (
        <div className="Home">
        <a href={ 'http://localhost:8080/authorize' }>
          <button>Login</button>
        </a>
        <button onClick={this.getData} >Get data</button>
      </div>
    )
  }
}

export default Home;
