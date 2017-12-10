import React, { Component } from "react";
import './Weight.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";
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
    let weight = (Math.round(this.props.todayData.todayWeight.weight * 2.20462262185))
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
    })
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
      <div className="Weight">
      <Hamburger/>
        <div className="Weight_Header">
          <div>
          <img src={ScaleImg} alt="scale img" className="Scale_Img"/>
            <h1 className="Weight_Today">Weight</h1>
          </div>
          <div className='Weight_Header_Buffer'></div>
        </div>
        <div className="Weight_Metrics">
          <div className="Weight_Metric">
            <div className="Weight_Weight">
              <hr />
              <h2>Today</h2>
              <div className="Weight_Chart">
                <Circle
                  percent={this.state.percent}
                  strokeWidth="3"
                  strokeColor="#AF5ECE"
                  strokeLinecap="round"
                />

                <div className="Weight_Chart_Details">
                <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>{(Math.round(this.props.todayData.todayWeight.weight * 2.20462262185))}</p>
                  <p>lb</p>
                </div>

                <div className="Weight_Goal_Reminder">
                    <h1>You are {Math.abs(this.props.userData.starting_weight - this.props.userData.goal_weight)} lbs away from your goal</h1>
                  </div>
                  <div>
                  <Bar
                        data={data}
                        width={100}
                        height={250}
                        options={{
                          maintainAspectRatio: false,
                          scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                    legend: {
                      display: false
                    }
                  }
                        }
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
    
const mapStateToProps = (state) => {
  const { todayData, userData, allData } = state.databaseReducer;
  return {
    todayData,
    userData,
    allData
  };
};

export default connect(mapStateToProps, {getTodayWeight})(Weight);