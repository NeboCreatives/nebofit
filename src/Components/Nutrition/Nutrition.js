import React, { Component } from "react";
import "../../Details.css";
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
    this.icon = this.icon.bind(this);
    
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

  differenceTern(nutritionDifference){
    if (nutritionDifference > 0){
      return `${nutritionDifference} calories to go`
    } else {
      return `${nutritionDifference} over your goal`
    }
  }

  icon(mapNutrition){
    if(mapNutrition[mapNutrition.length-1] >= mapNutrition[mapNutrition.length-2]){
      return (
        <i className="fa fa-sort-asc" aria-hidden="true">
          {" "}
           {mapNutrition[mapNutrition.length-1] - mapNutrition[mapNutrition.length-2]}
        </i>
      )
    } else {
      return (
        <i className="fa fa-sort-desc" aria-hidden="true">
          {" "}
           {mapNutrition[mapNutrition.length-2] - mapNutrition[mapNutrition.length-1]}
        </i>
      )
    }
  }

  render() {
   
    let mapNutrition = this.props.allData.nutritionData.map(health => {
      return  health.calories
    })

    let mapDays = this.props.allData.nutritionData.map(health => {
      return moment(health.date).format('dddd')
    });
    let averageCalories = Math.round(mapNutrition.slice(0,7).reduce((a,b) => a + b)/7);
    mapNutrition = mapNutrition.slice(0,7).reverse();
    mapDays = mapDays.splice(0,7).reverse();

    let nutritionDifference = this.props.userData.goal_calories - this.props.todayData.todayNutrition.calories

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
      <div className="Details">
      <Hamburger/>
        <div className="Details_Header">
          <div>
          <i class="fa fa-cutlery" aria-hidden="true"></i>
            <h1 className="Details_Today">Nutrition</h1>
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
                    strokeColor="rgb(244,176,54)"
                    strokeLinecap="round"
                  />
                  <div className="Details_Chart_Details">
                    {this.icon(mapNutrition)}
                    <p>{typeof this.props.todayData.todayNutrition === 'undefined' ? 0 : this.props.todayData.todayNutrition.calories}</p>
                    <p>Cal</p>
                  </div>
                </div>
                <div className="Details_Goal_Reminder">
                  <h1>{nutritionDifference}</h1>                  
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
                Weekly Calories Average :{averageCalories}
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
  const {todayData, userData, allData} = state.databaseReducer;
  return {
    todayData,
    userData,
    allData
  }
}

export default connect(mapStateToProps, {getTodayNutrition}) (Nutrition);