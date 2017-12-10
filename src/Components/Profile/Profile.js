import React, { Component } from "react";
import "./Profile.css";
import Hamburger from "../Hamburger/Hamburger"
import {connect} from 'react-redux';

class Profile extends Component {


  render() {
    return (
      <div className="Profile">
        <Hamburger/>
        <div>
        <i className="fa fa-user" aria-hidden="true"></i>
        <h1 className="Profile_Today">Profile</h1>
        <hr className="Profile_Hr"/>
        
        </div>
        <div className="Avatar">
        <img src={this.props.userData.img} alt="profile_img" className="Avatar_Img"/>
        <h1 className="Profile_User_Name">{`${this.props.userData.user_first_name} ${this.props.userData.user_last_name}`}</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {userData} = state.databaseReducer
  console.log(userData)
  return {
    userData
  }
}

export default connect(mapStateToProps, {})(Profile);