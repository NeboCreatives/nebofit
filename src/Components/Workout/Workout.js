import React, { Component } from "react";
import './Workout.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";


class Workout extends Component {

  constructor() {
    super()

    this.state = {
      pulse: null,
      percent: 0
    }
    this.percentAnimation = this.percentAnimation.bind(this)
  }

  componentDidMount() {
    this.setState({
      pulse: setInterval(this.percentAnimation, 12)
    })
  }

  killInterval(){
    clearInterval(this.state.pulse)
  }

  percentAnimation(){
    if(this.state.percent < 65){
      this.setState({
        percent: ++this.state.percent
      })
    } else {
      this.killInterval()
      console.log(this.state.pulse)
    }
  }


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
          <i className="fa fa-heartbeat" aria-hidden="true"></i>
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
                <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>3</p>
                  <p>per week</p>
                </div>
                <div className="Workout_Goal_Reminder">
                    <h1>You are 2 workouts away from your goal</h1>
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