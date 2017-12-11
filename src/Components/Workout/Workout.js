import React, { Component } from "react";
import "../../Details.css";
import moment from "moment";
import { Circle } from "rc-progress";
import StepsImg from "../../Assets/footsteps-silhouette-variant.png";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { getTodayActivity } from "../../ducks/databaseReducer";
import Hamburger from "../Hamburger/Hamburger";


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
      <div className="Details">
        <Hamburger />
        <div className="Details_Header">
          <div>
            <img src={StepsImg} alt="steps img" className="Details_Img" />
            <h1 className="Details_Today">Workout</h1>
          </div>
          <div className="Details_Header_Buffer" />
        </div>
        <hr />
        <div className="Details_Main_Container">
          <div className="Details_Metric">
            <div className="Details_RC_Container">
              <div className="Details_RC">
                <h2>Today</h2>
                <div className="Details_Chart">
                  <Circle
                    percent={this.state.percent}
                    strokeWidth="3"
                    strokeColor="#92C94A"
                    strokeLinecap="round"
                  />
                  <div className="Details_Chart_Details">
                    <i className="fa fa-sort-asc" aria-hidden="true">
                      {" "}
                      +1
                    </i>
                    <p></p>
                    <p>Steps</p>
                  </div>
                </div>
                <div className="Details_Goal_Reminder">
                  <h1 className='Detail_Goal_Difference'>steps to go</h1>
                </div>
              </div>
            </div>
            <div className="Details_Chart_Container">
              <div className="Details_ChartJS">
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

export default connect(mapStateToProps, { getTodayActivity })(Workout);
