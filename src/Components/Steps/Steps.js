import React, { Component } from "react";
import './Steps.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";
import StepsImg from "../../Assets/footsteps-silhouette-variant.png";


class Steps extends Component {

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
                  <p>248</p>
                  <p>Steps</p>
                </div>
                  <div className="Steps_Goal_Reminder">
                    <h1>1892 steps to go</h1>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Steps;