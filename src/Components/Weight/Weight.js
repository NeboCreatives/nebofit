import React, { Component } from "react";
import './Weight.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
class Weight extends Component {


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
                  percent="29"
                  strokeWidth="6"
                  strokeColor="#AF5ECE"
                  strokeLinecap="round"
                />

                <div className="Weight_Chart_Details">
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