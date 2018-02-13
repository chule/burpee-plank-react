import React, { Component } from 'react';
import { blueGrey600 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
//import Button from "./components/Button";

import pick from 'lodash/pick';

import { auth, database, googleAuthProvider } from './components/firebase';
// import CurrentUser from './components/CurrentUser';
// import SignIn from './components/SignIn';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
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
      timerValue: 10,
      open: false,
      windowWidth: 0,
      windowHeight: 0,
      color_red: false,
      user: null

    };

    const date = new Date();

    this.todaysDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    this.buttonClick = this.buttonClick.bind(this);
    this.buttonClickReset = this.buttonClickReset.bind(this);
    this.handler = this.handler.bind(this);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  componentWillMount() {

    //this.bpRef = database.ref('users');

    auth.onAuthStateChanged((user) => {

      this.setState({ user });

      if (user) {

        console.log(user)
        database.ref(`users/${user.uid}/email`).once("value", snapshot => {
          const email = snapshot.val();
          if (email) {
            //console.log("user exists!", email);

            database.ref(`users/${user.uid}/exercises/${this.todaysDate}`)
              .set({ repetitions: this.state.number, timer: this.state.timerValue, time: 1518530821537 });

          } else { // add user to database
            database.ref('users')
              .child(user.uid)
              .set(pick(user, ['displayName', 'email', 'uid', 'photoURL']));

          }
        });
      }

    });
  }

  changeColor() {
    this.setState({ color_red: !this.state.color_red })
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

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
        this.setState({ runTimer: false });
        this.changeColor();
      } else {
        this.setState({ timer: currentTimer - 1 });
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
    this.changeColor();
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

    console.log(this.todaysDate)
    let bgColor = this.state.color_red ? "red" : "white"
    const { user } = this.state;

    return (

      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">

          {/* <RaisedButton
            label="Open Drawer"
            onClick={this.handleToggle}
          /> */}

          <AppBar
            title="Burpee plank timer"
            titleStyle={{ textAlign: "left" }}

            onLeftIconButtonClick={this.handleToggle}


            iconElementRight={
              // <FlatButton label="Save" />
              user
                ? <FlatButton label={"Sign Out " + user.displayName.split(" ")[0]} onClick={() => auth.signOut()} />

                // < CurrentUser user={user} />

                : <FlatButton label="Sign in" onClick={() => auth.signInWithPopup(googleAuthProvider)} />
            }


          />

          <div className="mainContent" style={{ backgroundColor: bgColor }}>
            <div className="mainConfig">



              <div>
                <p>
                  Number of repetitions: {this.state.number}
                  <br />
                  Timer duration: {this.state.timerValue}
                  <br />
                  Timer: {this.state.timer}
                </p>

                {this.state.windowWidth > 768 ?
                  <Bar className="bar" width={this.state.windowWidth * 2 / 3} height="30" data={this.state.timer} timerValue={this.state.timerValue} /> :
                  <Bar className="bar" width="200" height="15" data={this.state.timer} timerValue={this.state.timerValue} />
                }

              </div>
              {/* <Button name="Add one!" onClick={this.buttonClick} isDisabled={this.state.runTimer} />
          <Button name="Reset" onClick={this.buttonClickReset} /> */}
            </div>

            <div className="mainButton">
              <RaisedButton
                buttonStyle={{ height: 150, width: 150 }}
                label="Add one!"
                onClick={this.buttonClick}
                style={buttonStyle}
                disabled={this.state.runTimer}
              />
            </div>
          </div>



          <Drawer
            docked={false}

            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            <Modal
              onClick={this.appBarClick}
              handler={this.handler}
              reset={this.buttonClickReset}
              timerValue={this.state.timerValue} />

            <MenuItem onClick={this.buttonClickReset}>Reset repetitions</MenuItem>

            <MenuItem onClick={this.handleClose}>Close drawer</MenuItem>

          </Drawer>

        </div>
      </MuiThemeProvider >

    );
  }
}

export default App;
