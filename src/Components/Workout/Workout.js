import React, { Component } from "react";
import './Workout.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";


class Workout extends Component {


  render() {
    return (
      <div className="Workout">
        <div className="Workout_Header">
        <Link to="/UserLanding">
          <div className='Back_Circle'>
            <i className="fa fa-angle-left fa-2x" aria-hidden="true" style={{ margin: '0px 3px 2px 0' }}></i>
          </div>
          </Link>
          <div>
          <i class="fa fa-heartbeat" aria-hidden="true"></i>
            <h1 className="Workout_Today">Workout</h1>
          </div>
          <div className='Workout_Header_Buffer'></div>
        </div>
        <div className="Workout_Metrics">
          <div className="Workout_Metric">
            <div className="Workout_Workout">
              <hr />
              <h2>Today</h2>
              <div className="Workout_Chart">
                <Circle
                  percent="29"
                  strokeWidth="6"
                  strokeColor="#ED7078"
                  strokeLinecap="round"
                />

                <div className="Workout_Chart_Details">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Workout;