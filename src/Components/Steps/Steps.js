import React, { Component } from "react";
import "./Steps.css";
import moment from "moment";
import { Circle } from "rc-progress";
import StepsImg from "../../Assets/footsteps-silhouette-variant.png";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { getTodayActivity } from "../../ducks/databaseReducer";
import Hamburger from "../Hamburger/Hamburger";

class Steps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pulse: null,
      percent: 0
    };

    this.percentAnimation = this.percentAnimation.bind(this);
  }

  componentDidMount() {
    this.setState({
      pulse: setInterval(this.percentAnimation, 12)
    });
  }

  killInterval() {
    clearInterval(this.state.pulse);
  }

  percentAnimation() {
    let steps =
      Math.round(this.props.todayData.todayActivity.steps * 100) /
      100 /
      this.props.userData.goal_steps *
      100;
    if (this.state.percent < steps) {
      this.setState({
        percent: ++this.state.percent
      });
    } else {
      this.killInterval();
      console.log(this.state.pulse);
    }
  }

  render() {
    let mapSteps = this.props.allData.activityData.map(walk => {
      return walk.steps;
    });

    let mapDays = this.props.allData.activityData.map(walk => {
      return moment(walk.date).format("dddd");
    });
    mapSteps = mapSteps.splice(0, 7).reverse();
    mapDays = mapDays.splice(0, 7).reverse();

    let data = {
      labels: mapDays,
      datasets: [
        {
          // backgroundColor: 'rgb(146,201,74)',
          borderColor: "rgb(146,201,74)",
          borderWidth: 3,
          data: mapSteps
        }
      ]
    };

    let stepsDifference =
      this.props.userData.goal_steps - this.props.todayData.todayActivity.steps;

    return (
      <div className="Steps">
        <Hamburger />
        <div className="Steps_Header">
          <div>
            <img src={StepsImg} alt="steps img" className="Steps_Img" />
            <h1 className="Steps_Today">Steps</h1>
          </div>
          <div className="Steps_Header_Buffer" />
        </div>
        <hr />
        <div className="Steps_Main_Container">
          <div className="Steps_Metric">
            <div className="Steps_RC_Container">
              <div className="Steps_RC">
                <h2>Today</h2>
                <div className="Steps_Chart">
                  <Circle
                    percent={this.state.percent}
                    strokeWidth="3"
                    strokeColor="#92C94A"
                    strokeLinecap="round"
                  />
                  <div className="Steps_Chart_Details">
                    <i className="fa fa-sort-asc" aria-hidden="true">
                      {" "}
                      +1
                    </i>
                    <p>
                      {this.props.todayData.todayActivity.steps.toLocaleString()}
                    </p>
                    <p>Steps</p>
                  </div>
                </div>
                <div className="Steps_Goal_Reminder">
                  <h1 className='Step_Goal_Difference'>{stepsDifference.toLocaleString()} steps to go</h1>
                </div>
              </div>
            </div>
            <div className="Steps_Chart_Container">
              <div className="Steps_ChartJS">
                <Bar
                  data={data}
                  width={100}
                  height="100%"
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                    },
                    legend: {
                      display: false
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { todayData, userData, allData } = state.databaseReducer;
  return {
    todayData,
    userData,
    allData
  };
};

export default connect(mapStateToProps, { getTodayActivity })(Steps);
