import React, { Component } from 'react';

class ProgressBar extends Component {

  constructor(){
    super();
  }

  percentProgression = () => {
    return this.props.question * (100/this.props.maxQuestions);
  }
  
  render() {
    return (
        <>
        <div className='percentage'>
            <div className='progressPercent'>{`Question ${this.props.question}/${this.props.maxQuestions}`}</div>
            <div className='progressPercent'>Progression: {`${this.percentProgression()}%`}</div>
        </div>
        <div className='progressBar'>
            <div className='progressBarChange' 
            style={{width: `${this.percentProgression()}%`}}
            >
            </div>
        </div>
      </>
    )
  }
}

export default React.memo(ProgressBar);