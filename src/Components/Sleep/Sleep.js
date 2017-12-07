import React, {Component} from 'react';
import './Sleep.css';
import moment from 'moment';
import {Circle} from 'rc-progress';
import { Link } from "react-router-dom";

class Sleep extends Component {


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
            <i className="fa fa-bed fa-2x" aria-hidden="true"></i>
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
                  percent="29"
                  strokeWidth="6"
                  strokeColor="#7276E7"
                  strokeLinecap="round"
                />

                <div className="Sleep_Chart_Details">
                  <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>7.2</p>
                  <p>hrs</p>
                  <i class="fa fa-sort-desc" aria-hidden="true">  -1</i>
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