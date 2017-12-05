import React, {Component} from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import {getExercises} from '../../ducks/exerciseReducer';

class ExerciseLog extends Component{
    constructor(){
        super()

        this.state = {value: 1}
    }

    handleChange = (event,index, value) => {
        this.setState({value})
    }

    render(){
        const exercises = []
        const exercisesList = this.props.exercises.map((item,index)=>{
            exercises.push(<MenuItem value={index} key={index} primaryText={item}/>)
        })
        return(
          <div>
    <DropDownMenu style={{width:"200px"}} maxHeight={300} value={this.state.value} onChange={this.handleChange}>
        {exercises}
      </DropDownMenu>
          </div>  
        )
    }
}

const mapsStateToProps = (state) => {
    const {exercises} = state.reducer
    console.log(exercises)
    return {
        exercises
    }
}

export default connect(mapsStateToProps, {getExercises}) (ExerciseLog);