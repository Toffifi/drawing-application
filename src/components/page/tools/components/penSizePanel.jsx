/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

const PenSizePanel = class extends React.PureComponent {
  render() {
    return (
      <div className="left__penSize">
        <div className="left__penSize-1px" role="button" tabIndex="0" onClick={() => { this.props.setSelectedPenSize('1'); }}><i className="fas fa-square" /></div>
        <div className="left__penSize-2px" role="button" tabIndex="0" onClick={() => { this.props.setSelectedPenSize('2'); }}><i className="fas fa-square" /></div>
        <div className="left__penSize-3px" role="button" tabIndex="0" onClick={() => { this.props.setSelectedPenSize('3'); }}><i className="fas fa-square" /></div>
        <div className="left__penSize-4px" role="button" tabIndex="0" onClick={() => { this.props.setSelectedPenSize('4'); }}><i className="fas fa-square" /></div>
      </div>
    );
  }
};

export default PenSizePanel;
