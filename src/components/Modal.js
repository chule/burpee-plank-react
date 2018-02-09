import React, { Component } from 'react';
import ReactModal from 'react-modal';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            timerValue: this.props.timerValue
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.timer = this.timer.bind(this);
        this.closeAndSet = this.closeAndSet.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }


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
        return (
            <div>
                <button onClick={this.handleOpenModal}>Open Settings</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    appElement={document.getElementById('root')}
                >
                    <button onClick={this.closeAndSet}>Close Settings</button>
                    <p> Hello Settings! {this.state.timerValue}</p>

                    <button onClick={this.timer.bind(this, -1)}>Timer -</button>
                    <button onClick={this.timer.bind(this, 1)}>Timer +</button>


                </ReactModal>
            </div>
        );
    }
};

export default Modal;