import React, { Component } from "react";
import './Steps.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";
import StepsImg from "../../Assets/footsteps-silhouette-variant.png";
import {Bar} from "react-chartjs-2";
import { connect } from 'react-redux';
import { getTodayActivity } from "../../ducks/databaseReducer";

class Steps extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pulse: null,
      percent: 0, 
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
    if(this.state.percent < 63){
      this.setState({
        percent: ++this.state.percent
      })
    } else {
      this.killInterval()
      console.log(this.state.pulse)
    }
  }

    render() {
      let data = {
        labels: ['Steps', 'Steps', 'Steps', 'Steps', 'Steps', 'Steps', 'Steps'],
        datasets: [
          {
            label: 'Steps',
            backgroundColor: 'rgb(146, 201, 74)',
            borderColor: 'rgb(146, 201, 74)',
            borderWidth: 1,
            data: [6500, 5900, 8000, 8100, 5600, 5500, 4000]
          }
        ]
      }

      let stepsDifference = this.props.userData.goal_steps - this.props.todayData.todayActivity.steps

    return (
      <div className="Steps">
        <div className="Steps_Header">
        <Link to="/UserLanding">
          <div className='Back_Circle'>
            <i className="fa fa-angle-left fa-2x" aria-hidden="true" style={{ margin: '0px 3px 2px 0' }}></i>
          </div>
          </Link>
          <div>
          <img src={StepsImg} alt="steps img" className="Steps_Img"/>
            <h1 className="Steps_Today">Steps</h1>
          </div>
          <div className='Steps_Header_Buffer'></div>
        </div>
        <div className="Steps_Metrics">
          <div className="Steps_Metric">
            <div className="Steps_Steps">
              <hr />
              <h2>Today</h2>
              <div className="Steps_Chart">
                <Circle
                  percent={this.state.percent}
                  strokeWidth="6"
                  strokeColor="#92C94A"
                  strokeLinecap="round"
                />

                <div className="Steps_Chart_Details">
                <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>{this.props.todayData.todayActivity.steps.toLocaleString()}</p>
                  <p>Steps</p>
                </div>
                  <div className="Steps_Goal_Reminder">
                    <h1>{stepsDifference.toLocaleString()} steps to go</h1>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { todayData, userData } = state.databaseReducer;
  return {
    todayData,
    userData,
  };
};

export default connect(mapStateToProps, {getTodayActivity})(Steps);