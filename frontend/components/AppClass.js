import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialBoard = [null, null, null, null, "B", null, null, null, null]

const initialState = {
  message: initialMessage,
  email: initialEmail,
  board: initialBoard,
  steps: initialSteps,
}

export default class AppClass extends React.Component {

  state = initialState

  getXY = (board) => {
    let x,y;
    const newBoard = [...this.state.board]
    newBoard.forEach((sq, ind)=> {
      if (sq && ind < 3){
        y=1;
      } else if (sq && ind < 6){
        y=2;
      } else {
        y=3;
      }
      if (sq && ind === 0||3||6){
        x=1
      } else if (sq && ind === 1||4||7) {
        x=2
      } else {
        x=3;
      }
    })

    this.setState({
      ...this.state,
      x: x,
      y: y
    })
    return `(${x}, ${y})`
  }

  getXYMessage = () => {
    if (this.state.x === 1){}
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
  }

  getNextIndex = (direction) => {
    let newBoard = [...this.state.board];
    if(direction === "up"){

    }
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    
    this.setState({
      ...this.state,

    })

    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    axios.post('http://localhost:9000/api/result', )
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getXY(this.state.board)}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          {
            this.state.board.map((sq, i)=> {
              return(
              <div key={i} className={`square${sq? ' active' : ''}`}>{sq}</div>
              )
            })
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
