import React, { Component } from "react";
import "./Home.css"
import axios from "axios";

class Home extends Component {
  getData() {
    axios.get("/profile.json").then(res => console.log(res));
  }

  render() {
    return (
      <div className="Home">
        <div>
          <h1 className="Logo">NEBO FIT</h1>
        </div>
        <div className="Buttons">
        <a href={"http://localhost:8080/authorize"}>
          <div className="Button_Login"><p>LOGIN</p></div>
        </a>
        </div>

      </div>
    );
  }
}

export default Home;
