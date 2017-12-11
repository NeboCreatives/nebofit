import React, { Component } from "react";
import "../../Details.css";
import moment from 'moment';
import { Circle } from 'rc-progress';
import ScaleImg from "../../Assets/weight.png"
import { connect } from 'react-redux';
import { getTodayWeight } from "../../ducks/databaseReducer";
import {Bar} from "react-chartjs-2";
import Hamburger from "../Hamburger/Hamburger";


class Weight extends Component {

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
    let userData = this.props.userData;
    let goalWeightDifference = Math.abs(
      userData.starting_weight - userData.goal_weight
    );
    let currentWeightDifference = Math.abs(
      userData.user_weight - userData.goal_weight
    );
    let weight = (1 - currentWeightDifference / goalWeightDifference) * 100;
    if(this.state.percent < weight){
      this.setState({
        percent: ++this.state.percent
      })
    } else {
      this.killInterval()
      console.log(this.state.pulse)
    }
  }


  render() {
    let mapWeight = this.props.allData.weightData.map(scale => {
      return (Math.round(scale.weight * 2.20462262185))
    })

    let mapDays = this.props.allData.weightData.map(scale => {
      return moment(scale.date).format('dddd')
    });
    let averageWeight = Math.round(mapWeight.slice(0,7).reverse().reduce((a,b) => a + b)/7);

    mapWeight = mapWeight.splice(0,7).reverse();
    mapDays = mapDays.splice(0,7).reverse();
   
    let data = {
      labels: mapDays,
      datasets: [
        {
          // backgroundColor: 'rgb(114, 118, 231)',
          borderColor: 'rgb(175,94,206)',
          borderWidth: 3,
          data: mapWeight
        }
      ]
    }

    return (
      <div className="Details">
      <Hamburger/>
        <div className="Details_Header">
          <div>
          <img src={ScaleImg} alt="scale img" className="Scale_Img"/>
            <h1 className="Details_Today">Weight</h1>
          </div>
          <div className='Details_Header_Buffer'></div>
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
                    strokeColor="rgb(175,94,206)"
                    strokeLinecap="round"
                  />
                  <div className="Details_Chart_Details">
                    <i className="fa fa-sort-asc" aria-hidden="true">
                      {" "}
                      +1
                    </i>
                    <p>{(Math.round(this.props.todayData.todayWeight.weight * 2.20462262185))}</p>
                    <p>lb</p>
                  </div>
                </div>
                <div className="Details_Goal_Reminder">
                  <h1>{Math.round((this.props.userData.goal_weight - this.props.todayData.todayWeight.weight) * 2.20462262185)} lb till goal reached </h1>                  
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
              <div>
                <h1>
                Weekly Weight Average : {averageWeight}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
    
const mapStateToProps = (state) => {
  const { todayData, userData, allData } = state.databaseReducer;
  return {
    todayData,
    userData,
    allData
  };
};

export default connect(mapStateToProps, {getTodayWeight})(Weight);