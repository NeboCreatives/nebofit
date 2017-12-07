import React, { Component } from "react";
import "./UserLanding.css";
import moment from "moment";
import { Circle } from "rc-progress";
import axios from 'axios';
import { connect } from 'react-redux';
import { getTodaySleep, getTodayActivity, getTodayNutrition, getTodayWeight, saveUserData } from '../../ducks/databaseReducer';


class UserLanding extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount = () => {
    let date = moment().format('YYYY-MM-DD');
    axios.get('/api/auth/me')
      .then(response => {
        this.props.getTodaySleep(response.data.userData[0].user_id, date)
        this.props.getTodayActivity(response.data.userData[0].user_id, date)
        this.props.getTodayNutrition(response.data.userData[0].user_id, date)
        this.props.getTodayWeight(response.data.userData[0].user_id)
        this.props.saveUserData(response.data.userData[0])
      })
  }

  render() {
    const date = moment().format("MMMM DD, YYYY");

    let todayData = this.props.todayData;
    let userData = this.props.userData;

    let goalWeightDifference = Math.abs(userData.goal_starting_weight - userData.goal_weight);
    let currentWeightDifference = Math.abs(userData.user_weight - userData.goal_weight);
  
    return (
      <div className="UserLanding">
        <div className="UserLanding_Header">
          <h1 className="UserLanding_Today">Today</h1>
          <h1 className="UserLanding_Date">{date}</h1>
        </div>
        <div className="UserLanding_Metrics">
          <div className="UserLanding_Metric">
            <div className="UserLanding_Sleep">
              <hr />
              <h2>Sleep</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent={((Math.round((todayData.todaySleep.total_minutes/60)*100)/100)/userData.goal_sleep)*100}
                  strokeWidth="6"
                  strokeColor="#7276E7"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>{Math.round((todayData.todaySleep.total_minutes/60)*100)/100}</p>
                  <p>hrs</p>
                </div>
              </div>
            </div>
            <div className="UserLanding_Steps">
              <hr />
              <h2>Steps</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent={((Math.round((todayData.todayActivity.steps)*100)/100)/userData.goal_steps)*100}
                  strokeWidth="6"
                  strokeColor="#92C94A"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>{todayData.todayActivity.steps.toLocaleString()}</p>
                  <p>steps</p>
                </div>
              </div>
            </div>
            <div className="UserLanding_Calories">
              <hr />
              <h2>Calories</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent={((Math.round((todayData.todayNutrition.calories)*100)/100)/userData.goal_calories)*100}
                  strokeWidth="6"

                  strokeColor="#F4B036"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>{todayData.todayNutrition.calories}</p>
                  <p>cals</p>
                </div>
              </div>
            </div>
            <div className="UserLanding_Hydration">
              <hr />
              <h2>Hydration</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent={((Math.round((Math.round((todayData.todayNutrition.water*0.033814)*100)/100)*100)/100)/userData.goal_water)*100}
                  strokeWidth="6"
                  strokeColor="#5FC5D4"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>{Math.round((todayData.todayNutrition.water*0.033814)*100)/100}</p>
                  <p>oz</p>
                </div>
              </div>
            </div>
            <div className="UserLanding_Weight">
              <hr />
              <h2>Weight</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent={(1-(currentWeightDifference/goalWeightDifference))*100}
                  strokeWidth="6"

                  strokeColor="#AF5ECE"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>{Math.round((todayData.todayWeight.weight*2.20462)*100)/100}</p>
                  <p>lbs</p>
                </div>
              </div>
            </div>
            <div className="UserLanding_Workout">
              <hr />
              <h2>Workouts</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent="46"
                  strokeWidth="6"

                  strokeColor="#ED7078"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>4</p>
                  <p>per week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { todayData, userData } = state.databaseReducer;
  return {
    todayData,
    userData
  };
};

export default connect(mapStateToProps, { getTodaySleep, getTodayActivity, getTodayNutrition, getTodayWeight, saveUserData })(UserLanding);