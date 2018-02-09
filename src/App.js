import React, { Component } from 'react';
import Button from "./components/Button";
import Bar from "./components/Bar";
import Modal from "./components/Modal.js";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      timer: 10,
      runTimer: false,
      timerValue: 10

    };

    this.buttonClick = this.buttonClick.bind(this);
    this.buttonClickReset = this.buttonClickReset.bind(this);
    this.handler = this.handler.bind(this);
  }


  handler(addedValue) {
    var value = this.state.timerValue;
    this.setState({
      timerValue: value + addedValue
    });
  }

  timer() {

    let myInterval = setInterval(() => {
      const currentTimer = this.state.timer;
      if (currentTimer === 0 || this.state.runTimer === false) {
        clearInterval(myInterval);
        this.setState({ runTimer: false })
      } else {
        this.setState({ timer: currentTimer - 1 })
      }

    }, 1000);
  }

  buttonClick(e) {
    e.preventDefault();
    const currentNum = this.state.number;
    this.setState({
      number: currentNum + 1,
      timer: this.state.timerValue,
      runTimer: true
    });
    this.timer();
  }

  buttonClickReset(e) {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      number: 0,
      timer: this.state.timerValue,
      runTimer: false
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Burpee plank timer</h1>
        </header>

        <Modal handler={this.handler}
          //handlerMinus={this.handlerMinus}
          reset={this.buttonClickReset}
          timerValue={this.state.timerValue}
        />

        <p className="App-intro">
          Current number = {this.state.number}
          <br />
          Timer duration: {this.state.timerValue}
          <br />
          Timer: {this.state.timer}
        </p>
        <Bar width="200" height="10" data={this.state.timer} timerValue={this.state.timerValue} />
        <Button name="Add one!" onClick={this.buttonClick} isDisabled={this.state.runTimer} />
        <Button name="Reset" onClick={this.buttonClickReset} />
      </div>
    );
  }
}

export default App;
