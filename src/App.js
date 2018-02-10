import React, { Component } from 'react';
import { blueGrey600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
//import Button from "./components/Button";

import Bar from "./components/Bar";
import Modal from "./components/Modal.js";
import './App.css';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  // palette: {
  //   textColor: blueGrey600,
  // },
  appBar: {
    height: 60,
    color: blueGrey600
  }
});

const buttonStyle = {
  margin: 12,
};

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
    this.appBarClick = this.appBarClick.bind(this);
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

  appBarClick() {
    console.log(`appBarClick`);
  }

  render() {
    return (

      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">

          <AppBar
            title="Burpee plank timer"
            titleStyle={{textAlign:"left"}}
            onLeftIconButtonClick={this.appBarClick}
            iconElementLeft={
              <Modal handler={this.handler}
                reset={this.buttonClickReset}
                timerValue={this.state.timerValue}
              />
            }
            iconElementRight={<FlatButton label="Reset" onClick={this.buttonClickReset} style={buttonStyle} />}
          />



          <p className="App-intro">
            Current number = {this.state.number}
            <br />
            Timer duration: {this.state.timerValue}
            <br />
            Timer: {this.state.timer}
          </p>

          <Bar width="200" height="10" data={this.state.timer} timerValue={this.state.timerValue} />
          {/* <Button name="Add one!" onClick={this.buttonClick} isDisabled={this.state.runTimer} />
          <Button name="Reset" onClick={this.buttonClickReset} /> */}

          <RaisedButton
            label="Add one!"
            onClick={this.buttonClick}
            style={buttonStyle}
            disabled={this.state.runTimer}
          />
          

        </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
