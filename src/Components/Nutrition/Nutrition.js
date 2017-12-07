import React, { Component } from "react";
import './Nutrition.css'
import moment from 'moment';
import { Circle } from 'rc-progress';
import { Link } from "react-router-dom";


class Nutrition extends Component {


  render() {
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
                  percent="29"
                  strokeWidth="6"
                  strokeColor="#F4B036"
                  strokeLinecap="round"
                />

                <div className="Nutrition_Chart_Details">
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