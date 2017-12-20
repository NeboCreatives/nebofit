import React, { Component } from "react";
import "./UserLanding.css";
import moment from "moment";
import { Circle } from "rc-progress";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTodaySleep,
  getTodayActivity,
  getTodayNutrition,
  getTodayWeight,
  saveUserData,
  updateUserLandingFlag,
  getAllData
} from "../../ducks/databaseReducer";
import { getAllLifts } from '../../ducks/exerciseReducer';
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";

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
      open: false
    };
    this.sleepAnimation = this.sleepAnimation.bind(this);
    this.stepsAnimation = this.stepsAnimation.bind(this);
    this.caloriesAnimation = this.caloriesAnimation.bind(this);
    this.hydrationAnimation = this.hydrationAnimation.bind(this);
    this.weightAnimation = this.weightAnimation.bind(this);
    this.workoutAnimation = this.workoutAnimation.bind(this);
  }

  componentDidMount = () => {
    if (this.props.userLandingFlag === false) {
      let date = moment().format("YYYY-MM-DD");
      let rest = "get";
      axios.get("/api/auth/me").then(response => {
        let userID = response.data.userData[0].user_id;
        this.props.getTodaySleep(userID, date, rest);
        this.props.getTodayActivity(userID, date, rest);
        this.props.getTodayNutrition(userID, date, rest);
        this.props.getTodayWeight(userID, date, rest);
        this.props.saveUserData(response.data.userData[0]);
        axios
          .post(
            `/api/data/getSinceLastLogin/${userID}/${
              response.data.userData[0].last_login
            }/post`
          )
          .then(result => {
            axios
              .post(`/api/data/updateLastLogin/${userID}/${date}`)
          });
        this.props.getAllData(userID);
        this.props.getAllLifts(userID);
      });
      this.props.updateUserLandingFlag();
    }
    this.launchAnimations();
  };

  componentWillReceiveProps() {
    this.launchAnimations();
  }

  launchAnimations() {
    this.setState({
      sleepPulse: setInterval(this.sleepAnimation, 12),
      stepsPulse: setInterval(this.stepsAnimation, 12),
      caloriesPulse: setInterval(this.caloriesAnimation, 12),
      hydrationPulse: setInterval(this.hydrationAnimation, 12),
      weightPulse: setInterval(this.weightAnimation, 12),
      workoutPulse: setInterval(this.workoutAnimation, 12)
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
    let sleep =
      Math.round(todayData.todaySleep.total_minutes / 60 * 100) /
      100 /
      userData.goal_sleep *
      100;
    if (this.state.sleepPercent < sleep) {
      this.setState({
        sleepPercent: ++this.state.sleepPercent
      });
    } else {
      this.killSleepInterval();
    }
  }

  stepsAnimation() {
    let todayData = this.props.todayData;
    let userData = this.props.userData;
    let steps =
      Math.round(todayData.todayActivity.steps * 100) /
      100 /
      userData.goal_steps *
      100;
    if (this.state.stepsPercent < steps) {
      this.setState({
        stepsPercent: ++this.state.stepsPercent
      });
    } else {
      this.killStepsInterval();
    }
  }

  caloriesAnimation() {
    let todayData = this.props.todayData;

    let userData = this.props.userData;
    let calories = ((todayData.todayNutrition.calories) / userData.goal_calories) * 100;
    if (this.state.caloriesPercent < calories) {
      this.setState({
        caloriesPercent: ++this.state.caloriesPercent
      });
    } else {
      this.killCaloriesInterval();
    }
  }

  hydrationAnimation() {
    let todayData = this.props.todayData;
    let userData = this.props.userData;
    let hydration =
      Math.round(todayData.todayNutrition.water * 0.033814022558919) /
      userData.goal_hydration *
      100;
    if (this.state.hydrationPercent < hydration) {
      this.setState({
        hydrationPercent: ++this.state.hydrationPercent
      });
    } else {
      this.killHydrationInterval();
    }
  }

  weightAnimation() {
    let userData = this.props.userData;
    let goalWeightDifference = Math.abs(
      userData.starting_weight - userData.goal_weight
    );
    let currentWeightDifference = Math.abs(
      userData.user_weight - userData.goal_weight
    );

    let weight = (1 - currentWeightDifference / goalWeightDifference) * 100;
    if (this.state.weightPercent < weight) {
      this.setState({
        weightPercent: ++this.state.weightPercent
      });
    } else {
      this.killWeightInterval();
    }
  }

  workoutAnimation() {
    let count = 0;
    let averageRPE = 0;
    for(let i=0; i<this.props.weekLifts.length; i++){
      if(this.props.weekLifts[i] > 0){
        count++;
        averageRPE += this.props.weekLifts[i]
      }
    }
    averageRPE /= count;
    let workout = (this.props.weekLifts[6] / averageRPE)*100;
    if (this.state.workoutPercent < workout) {
      this.setState({
        workoutPercent: ++this.state.workoutPercent
      });
    } else {
      this.killWorkoutInterval();
    }
  }

 
  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    const date = moment().format("MMMM DD, YYYY");

    let todayData = this.props.todayData;
    
    return (
      <div className="UserLanding">
        <div className="UserLanding_Header">
          <div className="UserLanding_Buffer" />
          <div className="UserLanding_Center">
            <h1 className="UserLanding_Today">Today</h1>
            <h1 className="UserLanding_Date">{date}</h1>
          </div>
          {/* //////////// 
          Created a hamburger drop down for User_Landing page separately as
          we did not need the back button from the nav bar component. When
          making changes to the hamburger button, please make edits to both the
          navbar component as well as the hamburger button on the User_Landing
          component 
          //////////// */}
          <div className="Hamburger_Button">
            <div className="menu-button" onClick={this.handleToggle}>
              <div className="Hamburger_Div" />
              <div className="Hamburger_Div" />
              <div className="Hamburger_Div" />
            </div>
          </div>
        </div>

        <div>
          <Drawer
            docked={false}
            width={250}
            open={this.state.open}
            openSecondary={true}
            onRequestChange={open => this.setState({ open })}
            containerClassName="drawer"
          >
            <Link to="/Profile" className="link">
              <MenuItem onClick={this.handleClose} className="menu-item">
                Profile
              </MenuItem>
            </Link>

            <Link to="/UserLanding" className="link">
              <MenuItem onClick={this.handleClose} className="menu-item">
                Today
              </MenuItem>
            </Link>
            <Link to="/ExerciseLog" className='link'>
              <MenuItem onClick={this.handleClose} className="menu-item">
                Exercise Log
              </MenuItem>
            </Link>
            <a href={process.env.REACT_APP_LOGOUT}>
              <MenuItem onClick={this.handleClose} className="menu-item">
                Logout
              </MenuItem>
            </a>
          </Drawer>
        </div>

        <div className="UserLanding_Metrics">
          <div className="UserLanding_Metric">
            <Link to="/Sleep">
              <div className="UserLanding_Sleep">
                <hr />
                <h2>Sleep</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={
                      typeof todayData.todaySleep === "undefined"
                        ? 0
                        : this.state.sleepPercent
                    }
                    strokeWidth="4"
                    strokeColor="#7276E7"
                    strokeLinecap="round"
                  />

                  <div className="UserLanding_Chart_Details">
                    <p>
                      {typeof todayData.todaySleep === "undefined"
                        ? 0
                        : Math.round(
                            todayData.todaySleep.total_minutes / 60 * 100
                          ) / 100}
                    </p>
                    <p>hrs</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/Steps">
              <div className="UserLanding_Steps">
                <hr />
                <h2>Steps</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={
                      typeof todayData.todayActivity === "undefined"
                        ? 0
                        : this.state.stepsPercent
                    }
                    strokeWidth="4"
                    strokeColor="#92C94A"
                    strokeLinecap="round"
                  />
                  <div className="UserLanding_Chart_Details">
                    <p>
                      {typeof todayData.todayActivity === "undefined"
                        ? 0
                        : todayData.todayActivity.steps.toLocaleString()}
                    </p>
                    <p>steps</p>
                  </div>
                </div>
              </div>
            </Link>
            {/* To display Calories i used Nutrition route if it needs to be changed just say so and I can change it to calories */}
            <Link to="/Nutrition">
              <div className="UserLanding_Calories">
                <hr />
                <h2>Calories</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={
                      typeof todayData.todayNutrition === "undefined"
                        ? 0
                        : this.state.caloriesPercent
                    }
                    strokeWidth="4"
                    strokeColor="#F4B036"
                    strokeLinecap="round"
                  />
                  <div className="UserLanding_Chart_Details">
                    <p>
                      {typeof todayData.todayNutrition === "undefined"
                        ? 0
                        : todayData.todayNutrition.calories}
                    </p>
                    <p>cals</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/Hydration">
              <div className="UserLanding_Hydration">
                <hr />
                <h2>Hydration</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={
                      typeof todayData.todayNutrition === "undefined"
                        ? 0
                        : this.state.hydrationPercent
                    }
                    strokeWidth="4"
                    strokeColor="#5FC5D4"
                    strokeLinecap="round"
                  />
                  <div className="UserLanding_Chart_Details">
                    <p>
                      {typeof todayData.todayNutrition === "undefined" ? 0 : Math.round(todayData.todayNutrition.water * 0.033814022558919 )}
                    </p>
                    <p>oz</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/Weight">
              <div className="UserLanding_Weight">
                <hr />
                <h2>Weight</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={
                      typeof todayData.todayWeight === "undefined"
                        ? 0
                        : this.state.weightPercent
                    }
                    strokeWidth="4"
                    strokeColor="#AF5ECE"
                    strokeLinecap="round"
                  />
                  <div className="UserLanding_Chart_Details">
                    <p>
                      {typeof todayData.todayWeight === "undefined"
                        ? 0
                        : Math.round(
                            todayData.todayWeight.weight * 2.20462262185
                          )}
                    </p>
                    <p>lbs</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/Workout">
              <div className="UserLanding_Workout">
                <hr />
                <h2>Workouts</h2>
                <div className="UserLanding_Chart">
                  <Circle
                    percent={
                      typeof this.props.weekLifts === "undefined"
                        ? 0
                        : this.state.workoutPercent
                    }
                    strokeWidth="4"
                    strokeColor="#ED7078"
                    strokeLinecap="round"
                  />
                  <div className="UserLanding_Chart_Details">
                    <p>{typeof this.props.weekLifts === "undefined"
                        ? 0
                        : this.props.weekLifts[6]}</p>
                    <p>lbs per RPE</p>
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

const mapStateToProps = state => {
  const {
    todayData,
    userData,
    userLandingFlag,
    allData,
  } = state.databaseReducer;
  const { weekLifts } = state.reducer
  return {
    todayData,
    userData,
    userLandingFlag,
    allData,
    weekLifts
  };
};

export default connect(mapStateToProps, {
  getTodaySleep,
  getTodayActivity,
  getTodayNutrition,
  getTodayWeight,
  saveUserData,
  updateUserLandingFlag,
  getAllData,
  getAllLifts
})(UserLanding);
