import React, {useState} from 'react'
import axios from 'axios'

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

export default function AppFunctional(props) {

  const [state, setState] = useState(initialState);
  const {className} = props

  const getXY = (idx) => {
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

  const reset = () => {
    setState(initialState)
  }

  const getNextIndex = (direction) => {
    const cI = state.index;
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

  const move = (evt) => {
    const { move, message } = getNextIndex(evt.target.id)
    const newIndex = state.index + move;
    const {x, y} = getXY(newIndex)
    setState({
      ...state,
      message: message,
      xCord: x,
      yCord: y,
      index: newIndex,
      steps: move? state.steps +1: state.steps
    })
  }

  const onChange = (evt) => {
    setState({
      ...state,
      email: evt.target.value
    })
    // You will need this to update the value of the input.
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    const payload = {
      x: state.xCord,
      y: state.yCord,
      steps: state.steps,
      email: state.email
    }
    axios.post("http://localhost:9000/api/result", payload)
      .then((res)=> {
      setState({
        ...state,
        message: res.data.message,
        email: ''
      })
    }).catch((err)=> {
      console.log(err)
    })
  }

  return (
    <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({state.xCord}, {state.yCord})</h3>
          <h3 id="steps">You moved {state.steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === state.index ? ' active' : ''}`}>
                {idx === state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={move}>LEFT</button>
          <button id="up" onClick={move}>UP</button>
          <button id="right" onClick={move}>RIGHT</button>
          <button id="down" onClick={move}>DOWN</button>
          <button id="reset" onClick={reset}>reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={onChange} value={state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
