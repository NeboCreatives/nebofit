import React, { Component } from "react";
import "./Home.css"

class Home extends Component {


  render() {
    return (
      <div className="Home">
        <div className="Logo_Container">
          <h1 className="Logo">NEBO</h1>
          <h1 className="Logo_Bottom">FIT</h1>
        </div>
        <div className="Buttons">
        <a href={"http://localhost:8080/authorize"}>
          <div className="Button_Login" ><p>LOGIN</p></div>
        </a>
        </div>

      </div>
    );
  }
}

export default Home;
