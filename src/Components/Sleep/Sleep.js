import React, {Component} from 'react';
import './Sleep.css';
import moment from 'moment';
import {Circle} from 'rc-progress';
import { Link } from "react-router-dom";
import {Bar} from "react-chartjs-2"
import {connect} from 'react-redux';
import {getTodaySleep} from '../../ducks/databaseReducer';


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
    let sleep = ((Math.round((this.props.todayData.todaySleep.total_minutes / 60) * 100) / 100) / this.props.userData.goal_sleep) * 100;
    if(this.state.percent < sleep){
      this.setState({
        percent: ++this.state.percent
      })
    } else {
      this.killInterval()
      console.log(this.state.pulse)
    }
  }

  

  render() {
    let mapMinutes = this.props.allData.sleepData.map(night => {
      return Math.round((night.total_minutes/60)*100)/100
    })

    let mapDays = this.props.allData.sleepData.map(night => {
      return moment(night.date).format('dddd')
    })
    mapMinutes = mapMinutes.splice(0,7).reverse();
    mapDays = mapDays.splice(0,7).reverse();

    console.log(mapMinutes)
    console.log(mapDays)

    let data = {
      labels: mapDays,
      datasets: [
        {
          // backgroundColor: 'rgb(114, 118, 231)',
          borderColor: 'rgb(114, 118, 231)',
          borderWidth: 3,
          data: mapMinutes
        }
      ]
    }
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
                  strokeWidth="3"
                  strokeColor="#7276E7"
                  strokeLinecap="round"
                />

                <div className="Sleep_Chart_Details">
                  <i className="fa fa-sort-asc" aria-hidden="true">  +1</i>
                  <p>{Math.round((this.props.todayData.todaySleep.total_minutes/60)*100)/100}</p>
                  <p>hrs</p>
                </div>

                <div className="Sleep_Goal_Reminder">
                    <h1>Try to get .6 hrs more sleep tonight</h1>
                  </div>
                  <div className="chart">
                    <Bar
                        data={data}
                        width={100}
                        height={250}
                        options={{
                          maintainAspectRatio: false,
                          scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                    legend: {
                      display: false
                    }
                  }
                        }
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
  const {todayData, userData, allData} = state.databaseReducer
  return {
    todayData,
    userData,
    allData
  }
}

export default connect(mapStateToProps, {getTodaySleep})(Sleep);