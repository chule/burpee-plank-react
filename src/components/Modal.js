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
        this.timerPlus = this.timerPlus.bind(this);
        this.timerMinus = this.timerMinus.bind(this);
        this.closeAndSet = this.closeAndSet.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    timerPlus(e) {
        e.preventDefault();
        this.props.handlerPlus();
        var timerValue = this.state.timerValue;
        this.setState({
            timerValue: timerValue += 1
        });
        //this.props.reset();
    }

    timerMinus(e) {
        e.preventDefault();
        this.props.handlerMinus();
        var timerValue = this.state.timerValue;
        this.setState({
            timerValue: timerValue -= 1
        });
        //this.props.reset();

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
                    
                    <button onClick={this.timerMinus}>Timer -</button>
                    <button onClick={this.timerPlus}>Timer +</button>


                </ReactModal>
            </div>
        );
    }
};

export default Modal;