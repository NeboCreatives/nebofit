import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  updateInputs,
  addWorkout,
  addToSets,
} from '../../ducks/exerciseReducer';
import './ExerciseLog.css';
import ExerciseCard from './ExerciseCard'
import moment from 'moment';
import {Link} from 'react-router-dom';
import Hamburger from '../Hamburger/Hamburger';
import {Dropdown, Button} from 'semantic-ui-react';


class ExerciseLog extends Component {
  constructor() {
    super();

    this.state = {
      date: moment().format('YYYY-MM-DD'),
      workout: '',
      sets: '',
      weight: '',
      reps: '',
      rpe: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddWorkout = this.handleAddWorkout.bind(this);
  }

  //changes state to selected workout in dropdown menu
  handleDropDown = (event, data) => {
    this.setState(
      {
        workout: data.value,
      },
      () => this.handleChange(),
    );
  };

  //updates values of workout inputs in the redux store
  handleChange() {
    let sets = this.refs.sets.value;
    let weight = this.refs.weight.value;
    let reps = this.refs.reps.value;
    let rpe = this.refs.rpe.value;

    this.setState({
      sets: this.refs.sets.value,
      weight: this.refs.weight.value,
      reps: this.refs.reps.value,
      rpe: this.refs.rpe.value,
    });

    this.props.updateInputs({
      sets,
      weight,
      reps,
      rpe,
      workout: this.state.workout,
      date: this.state.date,
    });
  }

  //submit data to db and place onto the redux store
  handleAdd() {
    if (
      this.state.workout !== '' &&
      this.state.sets !== '' &&
      this.state.weight !== '' &&
      this.state.reps !== '' &&
      this.state.rpe !== ''
    ) {
      this.props.addWorkout();
      this.props.addToSets(this.props.inputs, this.state.workout);

      this.setState({
        sets: '',
        weight: '',
        reps: '',
        rpe: '',
      });
    }
  }

  handleSubmit = () => {
    axios.post(`/api/data/logLifts/${this.props.userData.user_id}`, {
      sets: this.props.sets,
    });
  };

  handleAddWorkout = (e, { value }) => {
    this.props.addWorkout(value.toUpperCase())
  }


  render() {
    const exerciseCard = this.props.sets.map((exercise, index)=> {
      return (
        <ExerciseCard
          key={index}
          exercise={exercise}
          index={index}
        />
      );
    });


    return (
      <div className="ExerciseLog">
        <Hamburger/>

        <div className="ExerciseLog_Header">
          <div>
            <i className="fa fa-book" aria-hidden="true"/>
            <h1 className="Details_Log">Exercise Log</h1>
          </div>
          <hr className="ExerciseLog_HR"/>
        </div>

        <Dropdown
          search
          selection
          allowAdditions
          onAddItem={this.handleAddWorkout}
          onChange={this.handleDropDown}
          placeholder="Select Workout"
          options={this.props.exercises}
          className='ExerciseLog_Dropdown'
        />

        <div className="ExerciseLog_Inputs">

        <div className="Input_Flex">
          <div className="Sets_Div">
          <div className="User_Input_Description">SETS</div>
          <input
            ref="sets"
            value={this.state.sets}
            style={{width: '51px' ,height: "24px"}}
            onChange={this.handleChange}
            className="User_Number_Input"
          />
          </div>

          <div className="Weight_Div">
          <div className="User_Input_Description">WEIGHT</div>
          <input
            ref="weight"
            value={this.state.weight}
            style={{width: '51px' ,height: "24px"}}
            onChange={this.handleChange}
            className="User_Number_Input"
          />
          </div>

        
          <div className="Reps_Div">
          <div className="User_Input_Description">REPS</div>
          <input
            ref="reps"
            value={this.state.reps}
            style={{width: '51px' ,height: "24px"}}
            onChange={this.handleChange}
            className="User_Number_Input"
          />
          </div>

          <div className="RPE_Div">
          <div className="User_Input_Description">RPE</div>
          <input
            ref="rpe"
            value={this.state.rpe}
            style={{width: '51px' ,height: "24px"}}
            onChange={this.handleChange}
            className="User_Number_Input"
          />
          </div>
          </div>

          <Button
            size="mini"
            onClick={this.handleAdd}
            className="Add_Button"
          >
            Add
          </Button>
        </div>
        <hr className="Add_HR"/>
        {exerciseCard}

        <Link to="/UserLanding" className="link">
          <Button 
          size="small" 
          onClick={() => this.handleSubmit()}
          className="Exercise_Submit_Button"
          >
            Submit
          </Button>
        </Link>
      </div>
    );
  }
}

const mapsStateToProps = state => {
  const {exercises, inputs, sets, allLifts} = state.reducer;
  const {userData} = state.databaseReducer;
  return {
    exercises,
    inputs,
    sets,
    userData,
    allLifts,
  };
};

export default connect(mapsStateToProps, {
  updateInputs,
  addWorkout,
  addToSets,
})(ExerciseLog);
