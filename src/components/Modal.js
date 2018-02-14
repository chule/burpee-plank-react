import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            timerValue: this.props.timerValue,
            open: false
        };

        this.timer = this.timer.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ timerValue: nextProps.timerValue });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.props.closeDrawer();
        this.setState({ open: false });
        //this.props.reset();
    };

    timer(value) {
        var timerValue = this.state.timerValue;

        if (this.state.timerValue + value > 0) {
            this.props.handler(value);
        
            this.setState({
                timerValue: timerValue + value
            });
        }


    }

    render() {

        const actions = [
            // <FlatButton
            //     label="Cancel"
            //     primary={true}
            //     onClick={this.handleClose}
            // />,
            <FlatButton
                label="Submit"
                primary={true}
                //keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];


        return (
            <div>

                {/* <IconButton iconStyle={{ fill: "white" }}>
                    <MoreVertIcon
                        onClick={this.handleOpen}
                    />
                </IconButton> */}
                {/* <FlatButton onClick={this.handleOpen}>Settings</FlatButton> */}
                <MenuItem onClick={this.handleOpen}>Set timer</MenuItem>

                <Dialog
                    title="Set timer value"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div className="settingsContainer">
                        <div>
                            <h2> {this.state.timerValue}</h2>
                        </div>
                        <div>
                            <RaisedButton onClick={this.timer.bind(this, -1)}>Timer -</RaisedButton>
                            <RaisedButton onClick={this.timer.bind(this, 1)}>Timer +</RaisedButton>
                        </div>
                    </div>
                </Dialog>
            </div>
        );

    }
};

export default Modal;