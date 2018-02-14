
import React, { Component } from 'react';
import { auth, googleAuthProvider } from './firebase';
import FlatButton from 'material-ui/FlatButton';

class SignIn extends Component {
  render() {
    return (
        // <FlatButton label="Sign in" onClick={() => auth.signInWithPopup(googleAuthProvider)}  />
        <FlatButton label="Save" />
        // <FlatButton onClick={() => auth.signInWithPopup(googleAuthProvider)}>Sign in</FlatButton>
    //   <div className="SignIn">
    //     <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>
    //       Sign In
    //     </button>
    //   </div>
    );
  }
}

export default SignIn;