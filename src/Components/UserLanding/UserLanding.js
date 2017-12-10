import React, {Component} from 'react';
import './UserLanding.css';
import moment from 'moment';
import {Circle} from 'rc-progress';
import axios from 'axios';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router-dom';
import {
  getTodaySleep,
  getTodayActivity,
  getTodayNutrition,
  getTodayWeight,
  saveUserData,
  updateUserLandingFlag,
} from '../../ducks/databaseReducer';
import Hamburger from "../Hamburger/Hamburger"


class UserLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sleepPulse: null,
      stepsPulse: null,
      caloriesPulse: null,
      hydrationPulse: null,
      weightPulse: null,
      workoutPulse: null,
      sleepPercent: 0,
      stepsPercent: 0,
      caloriesPercent: 0,
      hydrationPercent: 0,
      weightPercent: 0,
      workoutPercent: 0,
    };
    this.sleepAnimation = this.sleepAnimation.bind(this);
    this.stepsAnimation = this.stepsAnimation.bind(this);
    this.caloriesAnimation = this.caloriesAnimation.bind(this);
    this.hydrationAnimation = this.hydrationAnimation.bind(this);
    this.weightAnimation = this.weightAnimation.bind(this);
    // this.workoutAnimation = this.workoutAnimation.bind(this);
  }

  componentDidMount = () => {
    if (this.props.userLandingFlag === false) {
      let date = moment().format('YYYY-MM-DD');
      let rest = 'get';
      axios.get('/api/auth/me')
        .then(response => {
          let userID = response.data.userData[0].user_id;
          this.props.getTodaySleep(userID, date, rest);
          this.props.getTodayActivity(userID, date, rest);
          this.props.getTodayNutrition(userID, date, rest);
          this.props.getTodayWeight(userID, date, rest);
          this.props.saveUserData(response.data.userData[0]);
          axios.post(`/api/data/getSinceLastLogin/${userID}/${response.data.userData[0].last_login}/post`)
            .then(result => {
              axios.post(`/api/data/updateLastLogin/${userID}/${date}`)
                .then(res => console.log(res));
            });
        });
      this.props.updateUserLandingFlag();
    }
    this.launchAnimations();
  };

  componentWillReceiveProps() {
    this.launchAnimations();
  }

  launchAnimations(){
    this.setState({
      sleepPulse: setInterval(this.sleepAnimation, 12),
      stepsPulse: setInterval(this.stepsAnimation, 12),
      caloriesPulse: setInterval(this.caloriesAnimation, 12),
      hydrationPulse: setInterval(this.hydrationAnimation, 12),
      weightPulse: setInterval(this.weightAnimation, 12),
      // workoutPulse: setInterval(this.workoutAnimation, 12),
    });
  }

  killSleepInterval() {
    clearInterval(this.state.sleepPulse);
  }

  killStepsInterval() {
    clearInterval(this.state.stepsPulse);
  }

  killCaloriesInterval() {
    clearInterval(this.state.caloriesPulse);
  }

  killHydrationInterval() {
    clearInterval(this.state.hydrationPulse);
  }

  killWeightInterval() {
    clearInterval(this.state.weightPulse);
  }

  killWorkoutInterval() {
    clearInterval(this.state.workoutPulse);
  }

  sleepAnimation() {
    let todayData = this.props.todayData;
    let userData = this.props.userData;
    let sleep = ((Math.round((todayData.todaySleep.total_minutes / 60) * 100) / 100) / userData.goal_sleep) * 100;
    if (this.state.sleepPercent < sleep) {
      this.setState({
        sleepPercent: ++this.state.sleepPercent,
      });
    } else {
      this.killSleepInterval();
    }
  }

  stepsAnimation() {
    let todayData = this.props.todayData;
    let userData = this.props.userData;
    let steps = ((Math.round((todayData.todayActivity.steps) * 100) / 100) / userData.goal_steps) * 100;
    if (this.state.stepsPercent < steps) {
      this.setState({
        stepsPercent: ++this.state.stepsPercent,
      });
    } else {
      this.killStepsInterval();
    }
  }

  caloriesAnimation() {
    let todayData = this.props.todayData;
    let userData = this.props.userData;
    let calories = ((todayData.todayNutrition.calories) / 2000) * 100;
    if (this.state.caloriesPercent < calories) {
      this.setState({
        caloriesPercent: ++this.state.caloriesPercent,
      });
    } else {
      this.killCaloriesInterval();
    }
  }

  hydrationAnimation() {
    let todayData = this.props.todayData;
    let userData = this.props.userData;
    let hydration = ((Math.round(todayData.todayNutrition.water * 0.033814022558919)) / userData.goal_hydration) * 100;
    if (this.state.hydrationPercent < hydration) {
      this.setState({
        hydrationPercent: ++this.state.hydrationPercent,
      });
    } else {
      this.killHydrationInterval();
    }
  }

  weightAnimation() {
    let userData = this.props.userData;
    let goalWeightDifference = Math.abs(userData.starting_weight - userData.goal_weight);
    let currentWeightDifference = Math.abs(userData.user_weight - userData.goal_weight);

    let weight = ((1 - (currentWeightDifference / goalWeightDifference)) * 100);
    if (this.state.weightPercent < weight) {
      this.setState({
        weightPercent: ++this.state.weightPercent,
      });
    } else {
      this.killWeightInterval();
    }
  }

  render() {
    const date = moment().format('MMMM DD, YYYY');

    let todayData = this.props.todayData;

    console.log(this.props);

    return (
      <div className="UserLanding">
        <div className="UserLanding_Header">
          <h1 className="UserLanding_Today">Today</h1>
          <h1 className="UserLanding_Date">{date}</h1>
        </div>

        <div className="UserLanding_Metrics">
          <div className="UserLanding_Metric">
            <Link to="/Sleep">
              <div className="UserLanding_Sleep">
                <hr/>
                <h2>Sleep</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={typeof todayData.todaySleep === 'undefined' ? 0 : this.state.sleepPercent}
                    strokeWidth="6"
                    strokeColor="#7276E7"
                    strokeLinecap="round"
                  />

                  <div className="UserLanding_Chart_Details">
                    <p>{typeof todayData.todaySleep === 'undefined' ? 0 : Math.round((todayData.todaySleep.total_minutes / 60) * 100) / 100}</p>
                    <p>hrs</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/Steps">
              <div className="UserLanding_Steps">
                <hr/>
                <h2>Steps</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={typeof todayData.todayActivity === 'undefined' ? 0 : this.state.stepsPercent}
                    strokeWidth="6"
                    strokeColor="#92C94A"
                    strokeLinecap="round"
                  />
                  <div className="UserLanding_Chart_Details">
                    <p>{typeof todayData.todayActivity === 'undefined' ? 0 : todayData.todayActivity.steps.toLocaleString()}</p>
                    <p>steps</p>
                  </div>
                </div>
              </div>
            </Link>
            {/* To display Calories i used Nutrition route if it needs to be changed just say so and I can change it to calories */}
            <Link to="/Nutrition">
              <div className="UserLanding_Calories">
                <hr/>
                <h2>Calories</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={typeof todayData.todayNutrition === 'undefined' ? 0 : this.state.caloriesPercent}
                    strokeWidth="6"

                    strokeColor="#F4B036"
                    strokeLinecap="round"
                  />
                  <div className="UserLanding_Chart_Details">
                    <p>{typeof todayData.todayNutrition === 'undefined' ? 0 : todayData.todayNutrition.calories}</p>
                    <p>cals</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/Hydration">
              <div className="UserLanding_Hydration">
                <hr/>
                <h2>Hydration</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={typeof todayData.todayNutrition === 'undefined' ? 0 : this.state.hydrationPercent}
                    strokeWidth="6"
                    strokeColor="#5FC5D4"
                    strokeLinecap="round"
                  />
                  <div className="UserLanding_Chart_Details">
                    <p>{typeof todayData.todayNutrition === 'undefined' ? 0 : (Math.round(todayData.todayNutrition.water * 0.033814022558919))}</p>
                    <p>oz</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/Weight">
              <div className="UserLanding_Weight">
                <hr/>
                <h2>Weight</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={typeof todayData.todayWeight === 'undefined' ? 0 : this.state.weightPercent}
                    strokeWidth="6"

                    strokeColor="#AF5ECE"
                    strokeLinecap="round"
                  />
                  <div className="UserLanding_Chart_Details">
                    <p>{typeof todayData.todayWeight === 'undefined' ? 0 : (Math.round(todayData.todayWeight.weight * 2.20462262185))}</p>
                    <p>lbs</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/Workout">
              <div className="UserLanding_Workout">
                <hr/>
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
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {todayData, userData, userLandingFlag} = state.databaseReducer;
  return {
    todayData,
    userData,
    userLandingFlag,
  };
};

export default connect(mapStateToProps, {
  getTodaySleep,
  getTodayActivity,
  getTodayNutrition,
  getTodayWeight,
  saveUserData,
  updateUserLandingFlag,
})(UserLanding);