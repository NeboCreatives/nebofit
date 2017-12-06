import React, { Component } from "react";
import "./UserLanding.css";
import moment from "moment";
import { Circle } from "rc-progress";

class UserLanding extends Component {
  render() {
    const date = moment().format("MMMM DD, YYYY");
    console.log(date);

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
                  percent="29"
                  strokeWidth="6"
                  strokeColor="#7276E7"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>7.2</p>
                  <p>hrs</p>
                </div>
              </div>
            </div>
            <div className="UserLanding_Steps">
              <hr />
              <h2>Steps</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent="12"
                  strokeWidth="6"
                  strokeColor="#92C94A"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>892</p>
                  <p>steps</p>
                </div>
              </div>
            </div>
            {/* To display Calories i used Nutrition route if it needs to be changed just say so and I can change it to calories */}
            <div className="UserLanding_Calories">
              <hr />
              <h2>Calories</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent="23"
                  strokeWidth="6"

                  strokeColor="#F4B036"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>1825</p>
                  <p>cals</p>
                </div>
              </div>
            </div>
            <div className="UserLanding_Hydration">
              <hr />
              <h2>Hydration</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent="30"
                  strokeWidth="6"
                  strokeColor="#5FC5D4"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>53</p>
                  <p>oz</p>
                </div>
              </div>
            </div>
            <div className="UserLanding_Weight">
              <hr />
              <h2>Weight</h2>
              <div className="UserLanding_Chart">
                <Circle
                  percent="20"
                  strokeWidth="6"

                  strokeColor="#AF5ECE"
                  strokeLinecap="round"
                />
                <div className="UserLanding_Chart_Details">
                  <p>149</p>
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

export default UserLanding;
