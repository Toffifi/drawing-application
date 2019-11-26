/* eslint-disable import/extensions */

import React from 'react';
import './header.scss';
import Modal from '../modal-dialog/modal.jsx';

class Header extends React.PureComponent {
  render() {
    return (
      <div className="head">
        <div className="head__headline">
          <h1>Piskel-clone</h1>
        </div>
        <div className="head__shortcuts">
          <Modal />
        </div>
        <div className="head__singUp">
          <i className="fas fa-sign-in-alt" />
        </div>
      </div>
    );
  }
}

export default Header;
