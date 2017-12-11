import React, { Component } from "react";
import "./Profile.css";
import Hamburger from "../Hamburger/Hamburger"
import {connect} from 'react-redux';
import {Form, Button} from 'semantic-ui-react';

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

        <div>
          GOALS
        </div>

        <Form size='tiny'>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Form.Field>
            <label>Sleep</label>
            <input value={`${this.props.userData.goal_sleep}`}  />
          </Form.Field>
          <Form.Field>
            <label>Steps</label>
            <input value={`${this.props.userData.goal_steps}`}/>
          </Form.Field>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Form.Field>
            <label>Calories</label>
            <input value={`${this.props.userData.goal_calories}`} />
          </Form.Field>
          <Form.Field>
            <label>Hydration</label>
            <input value={`${this.props.userData.goal_hydration}`} />
          </Form.Field>
          </div>
          <div style={{display:'flex', justifyContent: 'center',}}>
          <div style={{width : '176px'}}>
          <Form.Field>
            <label>Weight</label>
            <input value={`${this.props.userData.goal_weight}`} />
          </Form.Field>
          </div>
          </div>
          <Button type='submit'>Submit</Button>
        </Form>

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