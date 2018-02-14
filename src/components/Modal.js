import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            timerValue: this.props.timerValue,
            open: false
        };

        // this.handleOpenModal = this.handleOpenModal.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);
        this.timer = this.timer.bind(this);
        this.closeAndSet = this.closeAndSet.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ timerValue: nextProps.timerValue });
    }
    // handleOpenModal() {
    //     this.setState({ showModal: true });
    // }

    // handleCloseModal() {
    //     this.setState({ showModal: false });
    // }


    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
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

    closeAndSet(e) {
        e.preventDefault();
        this.handleCloseModal();
        this.props.reset();
    }

    render() {
        console.log()
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