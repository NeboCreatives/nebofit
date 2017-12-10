import React, { Component } from "react";
import './Nutrition.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";
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
    let data = {
      labels: ['Nutrition'],
      datasets: [
        {
          label: 'Nutrition',
          backgroundColor: 'rgb(244, 176, 54)',
          borderColor: 'rgb(244, 176, 54)',
          borderWidth: 1,
          data: [typeof this.props.todayData.todayNutrition === 'undefined' ? 0 : this.props.todayData.todayNutrition.calories]
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
                    <h1>543 calories to go</h1>
                  </div>
                  <div className="chart">
                    <Bar
                        data={data}
                        width={5}
                        height={100}
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
    );
  }
}

const mapStateToProps = (state) => {
  const {todayData, userData} = state.databaseReducer;
  return {
    todayData,
    userData
  }
}

export default connect(mapStateToProps, {getTodayNutrition}) (Nutrition);