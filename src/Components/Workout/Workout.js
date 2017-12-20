import React, { Component } from "react";
import "../../Details.css";
import { Circle } from "rc-progress";
import dumbellImg from "../../Assets/dumbell.png";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import { getTodayActivity } from "../../ducks/databaseReducer";
import Hamburger from "../Hamburger/Hamburger";
import moment from 'moment';


class Workout extends Component {

  constructor() {
    super()

    this.state = {
      pulse: null,
      percent: 0
    }
    this.percentAnimation = this.percentAnimation.bind(this)
    this.differenceTern = this.differenceTern.bind(this);    
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
    let count = 0;
    let averageRPE = 0;
    for(let i=0; i<this.props.weekLifts.length; i++){
      if(this.props.weekLifts[i] > 0){
        count++;
        averageRPE += this.props.weekLifts[i]
      }
    }
    averageRPE /= count;
    let workout = (this.props.weekLifts[6] / averageRPE)*100;
    if (this.state.percent < workout) {
      this.setState({
        percent: ++this.state.percent
      });
    } else {
      this.killInterval();
    }
  }

  differenceTern(){
    let count = 0;
    let averageRPE = 0;
    for(let i=0; i<this.props.weekLifts.length; i++){
      if(this.props.weekLifts[i] > 0){
        count++;
        averageRPE += this.props.weekLifts[i]
      }
    }
    averageRPE /= count;
    let difference = Math.abs(Math.round((averageRPE - this.props.weekLifts[6])* 100) / 100)
    if(this.props.weekLifts[6] > averageRPE ){
      return `${difference} lbs over this week's average`
    } else {
      return `${difference} lbs under this week's average`
    }
  }

  icon(){
    let { weekLifts } = this.props;
    if(weekLifts[6] >= weekLifts[5]){
      return (
        <i className="fa fa-sort-asc" aria-hidden="true">
          {" "}
           <div className='icon_numbers'>{(weekLifts[6] - weekLifts[5])}</div>
        </i>
      )
    } else {
      return (
        <i className="fa fa-sort-desc" aria-hidden="true">
          {" "}
          <div className='icon_numbers'>{(weekLifts[5] - weekLifts[6])}</div>
        </i>
      )
    }
  }

  render() {

    let mapDays = this.props.allData.activityData.map(walk => {
      return moment(walk.date).format('dddd');
    });
    mapDays = mapDays.splice(0, 7).reverse();

    let data = {
      labels: mapDays,
      datasets: [
        {
          label: 'Workout',
          borderColor: 'rgb(234, 89, 99)',
          borderWidth: 3,
          data: this.props.weekLifts
        }
      ]
    }
    return (
      <div className="Details">
        <Hamburger />
        <div className="Details_Header">
          <div>
            <img src={dumbellImg} alt="workout img" className="Workout_icon" />
            <h1 className="Details_Today">Workout</h1>
          </div>
          <div className="Details_Header_Buffer" />
        </div>
        <hr />
        <div className="Details_Main_Container">
          <div className="Details_Metric">
            <div className="Details_RC_Container">
              <div className="Details_RC">
                <h2>Today</h2>
                <div className="Details_Chart">
                  <Circle
                    percent={
                      typeof this.props.weekLifts === "undefined"
                        ? 0
                        : this.state.percent
                    }
                    strokeWidth="3"
                    strokeColor="#ED7078"
                    strokeLinecap="round"
                  />
                  <div className="Details_Chart_Details">
                    {this.icon()}
                    <p>{typeof this.props.weekLifts === "undefined"
                        ? 0
                        : this.props.weekLifts[6]}</p>
                    <p>lbs per RPE</p>
                  </div>
                </div>
                <div className="Details_Goal_Reminder">
                  <h1 className='Detail_Goal_Difference'>{this.differenceTern()}</h1>
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
                          },
                        },
                      ],
                    },
                    legend: {
                      display: false
                    }
                  }}
                />
              </div>
            </div>          
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { todayData, userData, allData } = state.databaseReducer;
  const { weekLifts } = state.reducer;
  return {
    todayData,
    userData,
    allData,
    weekLifts
  };
};

export default connect(mapStateToProps, { getTodayActivity })(Workout);
