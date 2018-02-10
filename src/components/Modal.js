import React, { Component } from 'react';
// import ReactModal from 'react-modal';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
        this.props.reset();
    };

    timer(value) {

        this.props.handler(value);
        var timerValue = this.state.timerValue;
        this.setState({
            timerValue: timerValue + value
        });
    }

    closeAndSet(e) {
        e.preventDefault();
        this.handleCloseModal();
        this.props.reset();
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

                <IconButton iconStyle={{ fill: "white" }}>
                    <MoreVertIcon
                        onClick={this.handleOpen}
                    />
                </IconButton>


                <Dialog
                    title="Set timer value"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div>
                    <h2> {this.state.timerValue}</h2>
    
                    <RaisedButton onClick={this.timer.bind(this, -1)}>Timer -</RaisedButton>
                    <RaisedButton onClick={this.timer.bind(this, 1)}>Timer +</RaisedButton>
                    </div>
                </Dialog>
            </div>
        );

    }
};

export default Modal;