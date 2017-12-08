import React, { Component } from "react";
import './Workout.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";
import {Bar} from "react-chartjs-2"


class Workout extends Component {


  render() {
    let data = {
      labels: ['Workout', 'Workout', 'Workout', 'Workout', 'Workout', 'Workout', 'Workout'],
      datasets: [
        {
          label: 'Workout',
          backgroundColor: 'rgb(234, 89, 99)',
          borderColor: 'rgb(234, 89, 99)',
          borderWidth: 1,
          data: [6500, 5900, 8000, 8100, 5600, 5500, 4000]
        }
      ]
    }
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
                  <p>7.2</p>
                  <p>hrs</p>
                </div>
                <div className="Workout_Goal_Reminder">
                    <h1>You are 2 workouts away from your goal</h1>
                  </div>
                  <div className="chart">
                    <Bar
                        data={data}
                        width={600}
                        height={300}
                        options={{
                          maintainAspectRatio: false
                        }}
                      />
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