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

        <div className="Profile_Goals">
          MY GOALS
        </div>

        <Form size='tiny'>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Form.Field>
            <label className="Goal_Description">Sleep</label>
            <input 
            value={`${this.props.userData.goal_sleep}`}  
            className="Goal_Input"
            />
          </Form.Field>
          <Form.Field>
            <label className="Goal_Description">Steps</label>
            <input 
            value={`${this.props.userData.goal_steps}`}
            className="Goal_Input"
            />
          </Form.Field>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <Form.Field>
            <label className="Goal_Description">Calories</label>
            <input 
            value={`${this.props.userData.goal_calories}`}
            className="Goal_Input"
            />
          </Form.Field>
          <Form.Field>
            <label className="Goal_Description">Hydration</label>
            <input 
            value={`${this.props.userData.goal_hydration}`}
            className="Goal_Input"
            />
          </Form.Field>
          </div>
          <div style={{display:'flex', justifyContent: 'center',}}>
          <div style={{width : '176px'}}>
          <Form.Field>
            <label className="Goal_Description">Weight</label>
            <input 
            value={`${this.props.userData.goal_weight}`} 
            className="Goal_Input"
            />
          </Form.Field>
          </div>
          </div>
          <Button type='submit' className="Profile_Submit">Submit</Button>
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