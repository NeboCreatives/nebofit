import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getExercises, updateExercise, addWorkout} from '../../ducks/exerciseReducer';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class ExerciseLog extends Component {
  constructor() {
    super();

    this.state = {
      value: 1,
      exercise: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  };

//changes state to selected exercise in dropdown menu
  handleDropDown = (event, index, value) => {
    this.setState({
      value: value,
      exercise: '',
    });
  };

//updates values of exercise inputs in the redux store
  handleChange() {
    let sets = this.refs.sets.value;
    let weight = this.refs.weight.value;
    let reps = this.refs.reps.value;
    let rpe = this.refs.rpe.value;

    this.props.updateExercise({sets, weight, reps, rpe});
  }

  //submit data to db and place onto the redux store
  handleAdd() {
    let workout = this.state.exercise;
    let sets = this.refs.sets.value;
    let weight = this.refs.weight.value;
    let reps = this.refs.reps.value;
    let rpe = this.refs.rpe.value;
    this.props.addWorkout();
  }

  render() {

    //populates exercise drop down menu with values from redux store
    const exercises = [];
    const exercisesList = this.props.exercises.map((item, index) => {
      exercises.push(<MenuItem value={index} key={index} primaryText={item}/>);
    });
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <DropDownMenu style={{width: '200px'}} maxHeight={300} value={this.state.value} onChange={this.handleDropDown}>
          {exercises}
        </DropDownMenu>

        <div style={{margin: '0 6px 0 6px'}}>SETS</div>
        <input
          ref='sets'
          placeholder='0'
          onChange={this.handleChange}
        />

        <div style={{margin: '0 6px 0 6px'}}>WEIGHT</div>
        <input
          ref='weight'
          placeholder='0'
          onChange={this.handleChange}
        />

        <div style={{margin: '0 6px 0 6px'}}>REPS</div>
        <input
          ref='reps'
          placeholder='0'
          onChange={this.handleChange}
        />

        <div style={{margin: '0 6px 0 6px'}}>RPE</div>
        <input
          ref='rpe'
          placeholder='0'
          onChange={this.handleChange}
        />
        <button onClick={this.handleAdd}>
          Add
        </button>
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  const {exercises, inputs} = state.reducer;
  console.log(exercises);
  return {
    exercises,
    inputs,
  };
};

export default connect(mapsStateToProps, {getExercises, updateExercise, addWorkout})(ExerciseLog);