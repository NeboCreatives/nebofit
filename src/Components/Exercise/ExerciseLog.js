import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getExercises, updateExercise, addWorkout, addToSets} from '../../ducks/exerciseReducer';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class ExerciseLog extends Component {
  constructor() {
    super();

    this.state = {
      value: 1,
      exercise: '',
      sets: '',
      weight: '',
      reps: '',
      rpe: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  };

//changes state to selected exercise in dropdown menu
  handleDropDown = (event, index, value) => {
    this.setState({
      value: value,
      exercise: this.props.exercises[value],
    });
  };

//updates values of exercise inputs in the redux store
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

    this.props.updateExercise({sets, weight, reps, rpe});
  }

  //submit data to db and place onto the redux store
  handleAdd() {
    this.props.addWorkout();
    this.props.addToSets(this.props.inputs,this.props.exercises[this.state.value]);

    this.setState({
      exercise: '',
      sets: '',
      weight: '',
      reps: '',
      rpe: '',
    });
  }

  render() {

    //populates exercise drop down menu with values from redux store
    const exercises = [];
    const exercisesList = this.props.exercises.map((item, index) => {
      exercises.push(<MenuItem value={index} key={index} primaryText={item}/>);
    });

    const exerciseCard = this.props.sets.map((exercise) => {
      console.log(exercise)
      return (
        <div> workout: {exercise.workout} </div>
      );
    });

    console.log(this.props.sets);
    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <div style={{display: 'flex'}}>
          <DropDownMenu style={{width: '180px', marginLeft: '-15px'}} maxHeight={300} value={this.state.value}
                        onChange={this.handleDropDown}>
            {exercises}
          </DropDownMenu>

          <div style={{margin: '0px 6px 0px -15px'}}>SETS</div>
          <input
            ref='sets'
            value={this.state.sets}
            placeholder='0'
            style={{borderColor: 'black', width: '25px'}}
            onChange={this.handleChange}
          />
        </div>

        <div style={{display: 'flex'}}>
          <div style={{margin: '0 6px 0 6px'}}>WEIGHT</div>
          <input
            ref='weight'
            value={this.state.weight}
            placeholder='0'
            style={{borderColor: 'black', width: '25px'}}
            onChange={this.handleChange}
          />

          <div style={{margin: '0 6px 0 6px'}}>REPS</div>
          <input
            ref='reps'
            value={this.state.reps}
            placeholder='0'
            style={{borderColor: 'black', width: '25px'}}
            onChange={this.handleChange}
          />

          <div style={{margin: '0 6px 0 6px'}}>RPE</div>
          <input
            ref='rpe'
            value={this.state.rpe}
            placeholder='0'
            style={{borderColor: 'black', width: '25px'}}
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.handleAdd}>
          Add
        </button>

        {exerciseCard}
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  const {exercises, inputs, sets} = state.reducer;
  return {
    exercises,
    inputs,
    sets,
  };
};

export default connect(mapsStateToProps, {getExercises, updateExercise, addWorkout, addToSets})(ExerciseLog);