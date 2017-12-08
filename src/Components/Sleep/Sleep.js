import React, {Component} from 'react';
import './Sleep.css';
import moment from 'moment';
import {Circle} from 'rc-progress';
import { Link } from "react-router-dom";

class Sleep extends Component {

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
    if(this.state.percent < 80){
      this.setState({
        percent: ++this.state.percent
      })
    } else {
      this.killInterval()
      console.log(this.state.pulse)
    }
  }


  render() {
    const date = moment().format('MMMM DD, YYYY');
    return (
      <div className="Sleep">
        <div className="Sleep_Header">
        <Link to="/UserLanding">
          <div className='Back_Circle'>
            <i className="fa fa-angle-left fa-2x" aria-hidden="true" style={{margin: '0px 3px 2px 0'}}></i>
          </div>
          </Link>
          <div>
          <i className="fa fa-moon-o" aria-hidden="true"></i>
            <h1 className="Sleep_Today">Sleep</h1>
          </div>
          <div className='Sleep_Header_Buffer'></div>
          {/*<h1 className="Sleep_Date">{date}</h1>*/}
        </div>
        <div className="Sleep_Metrics">
          <div className="Sleep_Metric">
            <div className="Sleep_Sleep">
              <hr/>
              <h2>Today</h2>
              <div className="Sleep_Chart">
                <Circle
                  percent={this.state.percent}
                  strokeWidth="6"
                  strokeColor="#7276E7"
                  strokeLinecap="round"
                />

                <div className="Sleep_Chart_Details">
                  <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>7.2</p>
                  <p>hrs</p>
                </div>

                <div className="Sleep_Goal_Reminder">
                    <h1>Try to get .6 hrs more sleep tonight</h1>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sleep;