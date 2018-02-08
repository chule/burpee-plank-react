import React from "react";

export default function Button(props) {

    if (props.isDisabled) {
       return ( <button className="App-button" type="button" onClick={props.onClick} disabled>
            {props.name}
        </button>);
    } else {
        return (<button className="App-button" type="button" onClick={props.onClick} >
            {props.name}
        </button>);
    }


};