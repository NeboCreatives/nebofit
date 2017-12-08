import React, { Component } from "react";
import './Nutrition.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";
import {Bar} from "react-chartjs-2"


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
    if(this.state.percent < 60){
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
      labels: ['Nutrition', 'Nutrition', 'Nutrition', 'Nutrition', 'Nutrition', 'Nutrition', 'Nutrition'],
      datasets: [
        {
          label: 'Nutrition',
          backgroundColor: 'rgb(244, 176, 54)',
          borderColor: 'rgb(244, 176, 54)',
          borderWidth: 1,
          data: [6500, 5900, 8000, 8100, 5600, 5500, 4000]
        }
      ]
    }
    return (
      <div className="Nutrition">
        <div className="Nutrition_Header">
        <Link to="/UserLanding">
          <div className='Back_Circle'>
            <i className="fa fa-angle-left fa-2x" aria-hidden="true" style={{ margin: '0px 3px 2px 0' }}></i>
          </div>
          </Link>
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
                  strokeWidth="6"
                  strokeColor="#F4B036"
                  strokeLinecap="round"
                />

                <div className="Nutrition_Chart_Details">
                <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>7.2</p>
                  <p>Cal</p>
                </div>
                <div className="Nutrition_Goal_Reminder">
                    <h1>543 calories to go</h1>
                  </div>
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
    );
  }
}

export default Nutrition;