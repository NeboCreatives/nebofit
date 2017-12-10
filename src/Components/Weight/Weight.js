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
   
    let data = {
      labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      datasets: [
        {
          label: 'Weight',
          backgroundColor: 'rgb(175, 94, 206)',
          borderColor: 'rgb(175, 94, 206)',
          borderWidth: 1,
          data: [(Math.round(this.props.todayData.todayWeight.weight * 2.20462262185))]
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
                    <h1>You are 10 lbs away from your goal</h1>
                  </div>
                  <div>
                  <Bar
                        data={data}
                        width={25}
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
  const { todayData, userData } = state.databaseReducer;
  return {
    todayData,
    userData,
  };
};

export default connect(mapStateToProps, {getTodayWeight})(Weight);