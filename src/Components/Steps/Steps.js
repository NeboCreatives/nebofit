import React, { Component } from "react";
import './Steps.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
class Steps extends Component {


  render() {
    return (
      <div className="Steps">
        <div className="Steps_Header">
          <div className='Back_Circle'>
            <i className="fa fa-angle-left fa-2x" aria-hidden="true" style={{ margin: '0px 3px 2px 0' }}></i>
          </div>
          <div>
          <i class="fa fa-road" aria-hidden="true"></i>
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
                  percent="29"
                  strokeWidth="6"
                  strokeColor="#92C94A"
                  strokeLinecap="round"
                />

                <div className="Steps_Chart_Details">
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