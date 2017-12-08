import React, { Component } from "react";
import './Weight.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";


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
    if(this.state.percent < 98){
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
      <div className="Weight">
        <div className="Weight_Header">
        <Link to="/UserLanding">
          <div className='Back_Circle'>
            <i className="fa fa-angle-left fa-2x" aria-hidden="true" style={{ margin: '0px 3px 2px 0' }}></i>
          </div>
          </Link>
          <div>
          <i class="fa fa-balance-scale" aria-hidden="true"></i>
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
                  strokeWidth="6"
                  strokeColor="#AF5ECE"
                  strokeLinecap="round"
                />

                <div className="Weight_Chart_Details">
                <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>7.2</p>
                  <p>hrs</p>
                </div>

                <div className="Weight_Goal_Reminder">
                    <h1>You are 10 lbs away from your goal</h1>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
    
export default Weight;