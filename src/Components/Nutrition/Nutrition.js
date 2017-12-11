import React, { Component } from "react";
import './Nutrition.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import {Bar} from "react-chartjs-2"
import {getTodayNutrition} from "../../ducks/databaseReducer"
import { connect } from 'react-redux';
import Hamburger from "../Hamburger/Hamburger"


class Nutrition extends Component {

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
    let calories = ((this.props.todayData.todayNutrition.calories) / 2000) * 100;
    if(this.state.percent < calories){
      this.setState({
        percent: ++this.state.percent
      })
    } else {
      this.killInterval()
      console.log(this.state.pulse)
    }
  }

  render() {
    console.log(this.props.userData)
    let mapNutrition = this.props.allData.nutritionData.map(health => {
      return  health.calories
    })

    let mapDays = this.props.allData.nutritionData.map(health => {
      return moment(health.date).format('dddd')
    })
    mapNutrition = mapNutrition.splice(0,7).reverse();
    mapDays = mapDays.splice(0,7).reverse();

    let data = {
      labels: mapDays,
      datasets: [
        {
          // backgroundColor: 'rgb(114, 118, 231)',
          borderColor: 'rgb(244,176,54)',
          borderWidth: 3,
          data: mapNutrition
        }
      ]
    }
    return (
      <div className="Nutrition">
      <Hamburger/>
        <div className="Nutrition_Header">
          <div>
          <i class="fa fa-cutlery" aria-hidden="true"></i>
            <h1 className="Nutrition_Today">Nutrition</h1>
          </div>
          <div className='Nutrition_Header_Buffer'></div>
        </div>
        <div className="Nutrition_Metrics">
          <div className="Nutrition_Metric">
            <div className="Nutrition_Nutrition">
              <hr />
              <h2>Today</h2>
              <div className="Nutrition_Chart">
                <Circle
                  percent={this.state.percent}
                  strokeWidth="3"
                  strokeColor="#F4B036"
                  strokeLinecap="round"
                />

                <div className="Nutrition_Chart_Details">
                <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>{typeof this.props.todayData.todayNutrition === 'undefined' ? 0 : this.props.todayData.todayNutrition.calories}</p>
                  <p>Cal</p>
                </div>
                <div className="Nutrition_Goal_Reminder">
                  <h1>{this.props.userData.goal_calories - this.props.todayData.todayNutrition.calories} calories left</h1>
                  </div>
                  <div className="chart">
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
  const {todayData, userData, allData} = state.databaseReducer;
  return {
    todayData,
    userData,
    allData
  }
}

export default connect(mapStateToProps, {getTodayNutrition}) (Nutrition);