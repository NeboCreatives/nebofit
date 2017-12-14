import React, {Component} from 'react';
import '../../Details.css';
import moment from 'moment';
import {Circle} from 'rc-progress';
import StepsImg from '../../Assets/footsteps-silhouette-variant.png';
import {Bar} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {getTodayActivity} from '../../ducks/databaseReducer';
import Hamburger from '../Hamburger/Hamburger';

class Steps extends Component {
  constructor(props) {
    super(props);

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
    let steps =
      Math.round(this.props.todayData.todayActivity.steps * 100) /
      100 /
      this.props.userData.goal_steps *
      100;
    if (this.state.percent < steps) {
      this.setState({
        percent: ++this.state.percent,
      });
    } else {
      this.killInterval();
      console.log(this.state.pulse);
    }
  }

  differenceTern(stepsDifference){
    if(stepsDifference > 0){
      return `${stepsDifference.toLocaleString()} steps to go`
    } else {
      return `${Math.abs(stepsDifference).toLocaleString()} steps over your goal`
    }
  }

  icon(mapSteps){
    if(mapSteps[mapSteps.length-1] >= mapSteps[mapSteps.length-2]){
      return (
        <i className="fa fa-sort-asc" aria-hidden="true">
          {" "}
           <div className='icon_numbers'>{(mapSteps[mapSteps.length-1] - mapSteps[mapSteps.length-2]).toLocaleString()}</div>
        </i>
      )
    } else {
      return (
        <i className="fa fa-sort-desc" aria-hidden="true">
          {" "}
          <div className='icon_numbers'>{(mapSteps[mapSteps.length-2] - mapSteps[mapSteps.length-1]).toLocaleString()}</div>
        </i>
      )
    }
  }

  render() {
    let mapSteps = this.props.allData.activityData.map(walk => {
      return walk.steps;
    });

    let mapDays = this.props.allData.activityData.map(walk => {
      return moment(walk.date).format('dddd');
    });

    let weeklyTotal = mapSteps.slice(0, 7).reduce((a, b) => a + b);
    let weeklyAvg = Math.round(mapSteps.slice(0,7).reduce((a,b) => a + b) / 7);

    mapSteps = mapSteps.splice(0, 7).reverse();
    mapDays = mapDays.splice(0, 7).reverse();


    let data = {
      labels: mapDays,
      datasets: [
        {
          // backgroundColor: 'rgb(146,201,74)',
          borderColor: 'rgb(146,201,74)',
          borderWidth: 3,
          data: mapSteps,
        },
      ],
    };

    let stepsDifference =
      this.props.userData.goal_steps - this.props.todayData.todayActivity.steps;

    return (
      <div className="Details">
        <Hamburger/>
        <div className="Details_Header">
          <div>
            <img src={StepsImg} alt="steps img" className="Details_Img"/>
            <h1 className="Details_Today">Steps</h1>
          </div>
          <div className="Details_Header_Buffer"/>
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
                    strokeColor="#92C94A"
                    strokeLinecap="round"
                  />
                  <div className="Details_Chart_Details">
                    {this.icon(mapSteps)}
                    <p>
                      {this.props.todayData.todayActivity.steps.toLocaleString()}
                    </p>
                    <p>Steps</p>
                  </div>
                </div>
                <div className="Details_Goal_Reminder">
                  <h1 className='Detail_Goal_Difference'>{this.differenceTern(stepsDifference)}</h1>
                </div>
              </div>
            </div>
            <div className="Details_Chart_Container">
              <div className="Details_ChartJS">
                <Bar
                  data={data}
                  width={100}
                  height='100%'
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
            <div>{`Weekly Total: ${weeklyTotal.toLocaleString()}`}</div>
            <div>{`Weekly Average: ${weeklyAvg}`}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {todayData, userData, allData} = state.databaseReducer;
  return {
    todayData,
    userData,
    allData,
  };
};

export default connect(mapStateToProps, {getTodayActivity})(Steps);
