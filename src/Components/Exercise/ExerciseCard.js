import React, {Component} from 'react';
import {Dropdown, Button, Modal} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {updateSets} from '../../ducks/exerciseReducer';

class ExerciseCard extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      workout: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateSets = this.updateSets.bind(this);

  }

  handleDropDown = (event, data) => {
    this.setState(
      {
        workout: data.value,
      });
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  };

  openModal = () => {
    this.setState({
      open: true,
    });
  };

  updateSets = (index) => {
    let sets = !this.refs.sets.value ? this.props.exercise.sets : this.refs.sets.value
    let weight = !this.refs.weight.value ? this.props.exercise.weight : this.refs.weight.value
    let reps = !this.refs.reps.value ? this.props.exercise.reps : this.refs.reps.value
    let rpe = !this.refs.rpe.value ? this.props.exercise.rpe : this.refs.rpe.value
    let workout = !this.state.workout ? this.props.exercise.workout : this.state.workout
    
    let editedSet = {
      workout,
      sets,
      weight,
      reps,
      rpe,
    }

    let newSets = [...this.props.sets];
    newSets[index] = editedSet;

    this.props.updateSets(index, newSets);
    this.closeModal()
  };

  render() {
    const {exercise, index} = this.props;
    return (
      <div>
        <div>Workout: {exercise.workout}</div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            margin: '6px 6px',
          }}
        >
          <div>Sets: {exercise.sets}</div>

          <div>Weight: {exercise.weight}</div>

          <div>REPS: {exercise.reps}</div>

          <div>RPE: {exercise.rpe}</div>

          <Button onClick={this.openModal}>edit</Button>

          <Modal open={this.state.open} onClose={this.closeModal}>
            <Modal.Header>
              Edit
            </Modal.Header>

            <Dropdown
              style={{marginTop: '21px'}}
              search
              onChange={this.handleDropDown}
              placeholder="Select Workout"
              options={this.props.exercises}
              defaultValue={this.props.sets[index].workout}
            />

            <div className="ExerciseLog_Inputs">
              <div>SETS</div>
              <input
                ref="sets"
                placeholder={this.props.sets[index].sets}
                style={{width: '36px'}}
                onChange={this.handleChange}
              />

              <div>WEIGHT</div>
              <input
                ref="weight"
                placeholder={this.props.sets[index].weight}
                style={{width: '36px'}}
                onChange={this.handleChange}
              />

              <div>REPS</div>
              <input
                ref="reps"
                placeholder={this.props.sets[index].reps}
                style={{width: '36px'}}
                onChange={this.handleChange}
              />

              <div>RPE</div>
              <input
                ref="rpe"
                placeholder={this.props.sets[index].rpe}
                style={{width: '36px'}}
                onChange={this.handleChange}
              />
            </div>

            <Modal.Actions>
              <Button color='black' onClick={this.closeModal}>
                Cancel
              </Button>
              <Button positive icon='checkmark' labelPosition='right' content="Save"
                      onClick={()=>this.updateSets(index, this.refs)}/>
            </Modal.Actions>
          </Modal>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {exercises, inputs, sets, allLifts} = state.reducer;

  return {
    exercises,
    inputs,
    sets,
    allLifts,
  };
};

export default connect(mapStateToProps, {updateSets})(ExerciseCard);