
import './modal.scss';

import React from 'react';
import ReactModal from 'react-modal';

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleKeyPress = (event) => {
    if (event.key === '/') {
      this.handleOpenModal();
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }


  render() {
    const { showModal } = this.state;
    return (
      <div>
        <button type="button" tabIndex="0" onKeyPress={this.handleKeyPress} onClick={this.handleOpenModal}><i className="far fa-keyboard" /></button>
        <ReactModal
          isOpen={showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <div className="modal__box">
            <p>N - Create new empty frame</p>
            <p>/ - Open the keyboard shortcut</p>
            <p>Click anywhere to close</p>
          </div>
        </ReactModal>
      </div>
    );
  }
}


export default Modal;
