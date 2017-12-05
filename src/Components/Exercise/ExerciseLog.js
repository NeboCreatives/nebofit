import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getExercises} from '../../ducks/exerciseReducer';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class ExerciseLog extends Component {
  constructor() {
    super();

    this.state = {value: 1};
  }

  handleDropDown = (event, index, value) => {
    this.setState({value});
  };

  render() {
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
        />

        <div style={{margin: '0 6px 0 6px'}}>REPS</div>
        <input
          ref='reps'
          placeholder='0'
        />

        <div style={{margin: '0 6px 0 6px'}}>RPE</div>
        <input
          ref='rpe'
          placeholder='0'
        />
        <button>
          Add
        </button>
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  const {exercises} = state.reducer;
  console.log(exercises);
  return {
    exercises,
  };
};

export default connect(mapsStateToProps, {getExercises})(ExerciseLog);