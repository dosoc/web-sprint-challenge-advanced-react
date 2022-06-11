import React from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  xCord: 2,
  yCord: 2,
}

export default class AppClass extends React.Component {
  state = initialState

  getXY = (idx) => {
    let x,y;
    if (idx === 0){x=1; y=1}
    if (idx === 1){x=2; y=1}
    if (idx === 2){x=3; y=1}
    if (idx === 3){x=1; y=2}
    if (idx === 4){x=2; y=2}
    if (idx === 5){x=3; y=2}
    if (idx === 6){x=1; y=3}
    if (idx === 7){x=2; y=3}
    if (idx === 8){x=3; y=3}
    return {x, y}
  }

  reset = () => {
    this.setState(initialState)
  }

  getNextIndex = (direction) => {
    const cI = this.state.index;
    let move = 0;
    let message = ''
    if (cI < 3 && direction === "up") {
        message = "You can't go up"
    }
    else if (cI > 5 && direction === 'down'){
        message = "You can't go down"
    }
    else if ([2,5,8].includes(cI)  && direction === "right") {
        message = "You can't go right"
    }
    else if ([0,3,6].includes(cI) && direction === 'left'){
        message = "You can't go left"
    }
    else {
      switch (direction) {
        case "left":
          move = -1;
          break;
        case "right":
          move = 1;
          break;
        case "up":
          move = -3;
          break;
        case "down":
          move = 3;
          break;
      }
    }
    return {
      move,
      message
    }
  }

  move = (evt) => {
    const { move, message } = this.getNextIndex(evt.target.id)
    const newIndex = this.state.index + move;
    const {x, y} = this.getXY(newIndex)
    this.setState({
      ...this.state,
      message: message,
      xCord: x,
      yCord: y,
      index: newIndex,
      steps: move? this.state.steps +1: this.state.steps
    })
  }

  onChange = (evt) => {
    this.setState({
      ...this.state,
      email: evt.target.value
    })
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    if (!this.state.email){
      this.setState({
        ...this.state,
        message: "Ouch: email is required",
        email: ""
      })
    } else {
      const payload = {
      x: this.state.xCord,
      y: this.state.yCord,
      steps: this.state.steps,
      email: this.state.email
    }
    axios.post("http://localhost:9000/api/result", payload)
      .then((res)=> {
      this.setState({
        ...this.state,
        message: res.data.message,
        email: ''
      })
    }).catch((err)=> {
      this.setState({
        ...this.state,
        message: err.response.data.message,
        email: ""
      })
    })
    }
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.xCord}, {this.state.yCord})</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1? `time`: `times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
