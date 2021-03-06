import React, {Component} from 'react';
import "../../Details.css";
import moment from 'moment';
import {Circle} from 'rc-progress';
import {Bar} from "react-chartjs-2"
import {connect} from 'react-redux';
import {getTodaySleep} from '../../ducks/databaseReducer';
import Hamburger from "../Hamburger/Hamburger"


class Sleep extends Component {

  constructor() {
    super()

    this.state = {
      pulse: null,
      percent: 0
    }
    this.percentAnimation = this.percentAnimation.bind(this)
    this.icon = this.icon.bind(this);
    
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

  differenceTern(sleepDifference){
    if (sleepDifference > 0){
      return `${sleepDifference} hrs left to reach goal`
    } else{
        return `${Math.round(sleepDifference)} hrs over your goal`
    }
  }

  icon(mapMinutes){
    if(mapMinutes[mapMinutes.length-1] >= mapMinutes[mapMinutes.length-2]){
      return (
        <i className="fa fa-sort-asc" aria-hidden="true">
          {" "}
           {Math.round((mapMinutes[mapMinutes.length-1] - mapMinutes[mapMinutes.length-2])*100)/100}
        </i>
      )
    } else {
      return (
        <i className="fa fa-sort-desc" aria-hidden="true">
          {" "}
           {Math.round((mapMinutes[mapMinutes.length-2] - mapMinutes[mapMinutes.length-1])*1000)/1000}
        </i>
      )
    }
  }
  

  render() {
    let mapMinutes = this.props.allData.sleepData.map(night => {
      return Math.round((night.total_minutes/60)*100)/100
    })

    let mapDays = this.props.allData.sleepData.map(night => {
      return moment(night.date).format('dddd')
    });
    let weeklyAvg = Math.round(mapMinutes.slice(0,7).reverse().reduce((a,b) => a + b)/7);

    mapMinutes = mapMinutes.splice(0,7).reverse();
    mapDays = mapDays.splice(0,7).reverse();

    let sleepDifference = Math.round((this.props.userData.goal_sleep - this.props.todayData.todaySleep.total_minutes / 60) * 100) / 100

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
    return (
      <div className="Details">
      <Hamburger/>
        <div className="Details_Header">

          <div>
          <i className="fa fa-moon-o" aria-hidden="true"></i>
            <h1 className="Details_Today">Sleep</h1>
          </div>
          <div className='Details_Header_Buffer'></div>
        </div>
        <hr />
        <div className="Details_Main_Container">
          <div className="Details_Metric">
            <div className="Details_RC_Container">
              <div className="Details_RC">
                <h2>Today</h2>
                <div className="Details_Chart">
                  <Circle
                    percent={this.state.percent}
                    strokeWidth="3"
                    strokeColor="rgb(114, 118, 231)"
                    strokeLinecap="round"
                  />
                  <div className="Details_Chart_Details">
                    {this.icon(mapMinutes)}
                    <p>{Math.round((this.props.todayData.todaySleep.total_minutes/60)*100)/100}</p>
                    <p>Hrs</p>
                  </div>
                </div>
                <div className="Details_Goal_Reminder">
                  <h1>{this.differenceTern(sleepDifference)}</h1>
                </div>
              </div>
            </div>
            <div className="Details_Chart_Container">
              <div className="Details_ChartJS">
                <Bar
                  data={data}
                  width={100}
                  height="100%"
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                    },
                    legend: {
                      display: false
                    }
                  }}
                />
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        <div>
            <div className="Weekly_Avg">{`Weekly Average: ${weeklyAvg} hrs`}</div>
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