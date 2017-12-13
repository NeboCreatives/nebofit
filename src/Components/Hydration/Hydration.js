import React, {Component} from 'react';
import '../../Details.css';
import moment from 'moment';
import {Circle} from 'rc-progress';
import {Bar} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {getTodayNutrition} from '../../ducks/databaseReducer';
import Hamburger from '../Hamburger/Hamburger';


class Hydration extends Component {
  constructor() {
    super();

    this.state = {
      pulse: null,
      percent: 0,
    };

    this.percentAnimation = this.percentAnimation.bind(this);
    this.differenceTern = this.differenceTern.bind(this);
    this.icon = this.icon.bind(this);
  }

  componentDidMount() {
    this.setState({
      pulse: setInterval(this.percentAnimation, 12),
    });
  }

  killInterval() {
    clearInterval(this.state.pulse);
  }

  percentAnimation() {
    let hydration = ((Math.round(this.props.todayData.todayNutrition.water * 0.033814022558919)) / this.props.userData.goal_hydration) * 100;
    if (this.state.percent < hydration) {
      this.setState({
        percent: ++this.state.percent,
      });
    } else {
      this.killInterval();
    }

  }

  differenceTern(waterDifference){
    if(waterDifference > 0){
      return `${waterDifference} oz to go`
    } else {
      return `${Math.abs(waterDifference)} oz over your goal`
    }
  }

  icon(mapWater){
    if(mapWater[mapWater.length-1] >= mapWater[mapWater.length-2]){
      return (
        <i className="fa fa-sort-asc" aria-hidden="true">
          {" "}
           {mapWater[mapWater.length-1] - mapWater[mapWater.length-2]}
        </i>
      )
    } else {
      return (
        <i className="fa fa-sort-desc" aria-hidden="true">
          {" "}
           {mapWater[mapWater.length-2] - mapWater[mapWater.length-1]}
        </i>
      )
    }
  }

  render() {
    let mapWater = this.props.allData.nutritionData.map(dayData => {
      return Math.round(dayData.water * 0.033814022558919);
    });

    let mapDays = this.props.allData.nutritionData.map(dayData => {
      return moment(dayData.date).format('dddd');
    });
    let weeklyAvg = Math.round(mapWater.slice(0, 7).reduce((a, b) => a + b) / 7);
    mapWater = mapWater.splice(0, 7).reverse();
    mapDays = mapDays.splice(0, 7).reverse();

    let waterDifference = Math.round(this.props.userData.goal_hydration - this.props.todayData.todayNutrition.water * 0.033814022558919)

    let data = {
      labels: mapDays,
      datasets: [
        {
          // backgroundColor: 'rgb(114, 118, 231)',
          borderColor: 'rgb(95,197,212)',
          borderWidth: 3,
          data: mapWater,
        },
      ],
    };
    return (
      <div className="Details">
        <Hamburger/>
        <div className="Details_Header">
          <div>
            <i className="fa fa-tint" aria-hidden="true"></i>
            <h1 className="Details_Today">Hydration</h1>
          </div>
          <div className='Details_Header_Buffer'></div>
        </div>

        <hr/>

        <div className="Details_Main_Container">
          <div className="Details_Metric">
            <div className="Details_RC_Container">
              <div className="Details_RC">
                <h2>Today</h2>
                <div className="Details_Chart">
                  <Circle
                    percent={this.state.percent}
                    strokeWidth="3"
                    strokeColor="rgb(95,197,212)"
                    strokeLinecap="round"
                  />
                  <div className="Details_Chart_Details">
                    {this.icon(mapWater)}
                    <p>{mapWater[mapWater.length-1]}</p>
                    <p>oz</p>
                  </div>
                </div>
                <div className="Details_Goal_Reminder">
                  <h1>{this.differenceTern(waterDifference)}</h1>
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
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                    legend: {
                      display: false,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div>{`Weekly Average: ${weeklyAvg}`}</div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const {todayData, userData, allData} = state.databaseReducer;
  return {
    todayData,
    userData,
    allData,
  };
};

export default connect(mapStateToProps, {getTodayNutrition})(Hydration);