import React from "react";

// import AppBar from 'material-ui/AppBar';
// import FlatButton from 'material-ui/FlatButton';
// import { auth, googleAuthProvider } from './firebase';


const AppBarComponent = (props) => {
    console.log(props)
    // console.log(props)
    // const { user } = this.props;
    return (

    <AppBar
        title="Burpee plank timer"
        titleStyle={{ textAlign: "left" }}

        onLeftIconButtonClick={this.handleToggle}


        iconElementRight={
            user
                ? <FlatButton label={"Sign Out " + user.displayName.split(" ")[0]} onClick={this.signOut} />

                : <FlatButton label="Sign in" onClick={() => auth.signInWithPopup(googleAuthProvider)} />
        }
    />
    );
};

export default AppBarComponent;