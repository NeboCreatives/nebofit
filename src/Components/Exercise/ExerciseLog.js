import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  updateInputs,
  addWorkout,
  addToSets
} from "../../ducks/exerciseReducer";
import "./ExerciseLog.css";
import moment from "moment";
import { Link } from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";

import { Dropdown, Button } from "semantic-ui-react";

class ExerciseLog extends Component {
  constructor() {
    super();

    this.state = {
      date: moment().format("YYYY-MM-DD"),
      workout: "",
      sets: "",
      weight: "",
      reps: "",
      rpe: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  //changes state to selected workout in dropdown menu
  handleDropDown = (event, data) => {
    this.setState(
      {
        workout: data.value
      },
      () => this.handleChange()
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
      rpe: this.refs.rpe.value
    });

    this.props.updateInputs({
      sets,
      weight,
      reps,
      rpe,
      workout: this.state.workout,
      date: this.state.date
    });
  }

  //submit data to db and place onto the redux store
  handleAdd() {
    if (
      this.state.workout !== "" &&
      this.state.sets !== "" &&
      this.state.weight !== "" &&
      this.state.reps !== "" &&
      this.state.rpe !== ""
    ) {
      this.props.addWorkout();
      this.props.addToSets(this.props.inputs, this.state.workout);

      this.setState({
        sets: "",
        weight: "",
        reps: "",
        rpe: ""
      });
    }
  }

  handleSubmit = () => {
    axios.post(`/api/data/logLifts/${this.props.userData.user_id}`, {
      sets: this.props.sets
    });
  };

  render() {
    const exerciseCard = this.props.sets.map((exercise, index) => {
      return (
        <div key={index}>
          <div>Workout: {exercise.workout}</div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: "6px 6px"
            }}
          >
            <div>Sets: {exercise.sets}</div>

            <div>Weight: {exercise.weight}</div>

            <div>REPS: {exercise.reps}</div>

            <div>RPE: {exercise.rpe}</div>
          </div>
        </div>
      );
    });


    return (
      <div className="ExerciseLog">
        <Hamburger />

        <div className="ExerciseLog_Header">
          <div>
            <i className="fa fa-book" aria-hidden="true" />
            <h1>Exercise Log</h1>
          </div>
          <hr className="ExerciseLog_HR" />
        </div>

        <Dropdown
          style={{ marginTop: "21px" }}
          search
          onChange={this.handleDropDown}
          placeholder="Select Workout"
          options={this.props.exercises}
        />

        <div className="ExerciseLog_Inputs">
          <div>SETS</div>
          <input
            ref="sets"
            value={this.state.sets}
            placeholder="0"
            style={{ width: "36px" }}
            onChange={this.handleChange}
          />

          <div>WEIGHT</div>
          <input
            ref="weight"
            value={this.state.weight}
            placeholder="0"
            style={{ width: "36px" }}
            onChange={this.handleChange}
          />

          <div>REPS</div>
          <input
            ref="reps"
            value={this.state.reps}
            placeholder="0"
            style={{ width: "36px" }}
            onChange={this.handleChange}
          />

          <div>RPE</div>
          <input
            ref="rpe"
            value={this.state.rpe}
            placeholder="0"
            style={{ width: "36px" }}
            onChange={this.handleChange}
          />

          <Button
            size="mini"
            style={{ marginLeft: "3px", marginRight: "15px" }}
            onClick={this.handleAdd}
          >
            Add
          </Button>
        </div>
        {exerciseCard}

        <Link to="/UserLanding" className="link">
          <Button size="mini" onClick={() => this.handleSubmit()}>
            Submit
          </Button>
        </Link>
      </div>
    );
  }
}

const mapsStateToProps = state => {
  const { exercises, inputs, sets, allLifts } = state.reducer;
  const { userData } = state.databaseReducer;
  return {
    exercises,
    inputs,
    sets,
    userData,
    allLifts
  };
};

export default connect(mapsStateToProps, {
  updateInputs,
  addWorkout,
  addToSets
})(ExerciseLog);
