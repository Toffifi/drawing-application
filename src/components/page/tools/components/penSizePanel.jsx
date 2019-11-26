/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const PenSizePanel = class extends React.PureComponent {
  render() {
    const { changePixelSize } = this.props;
    return (
      <div className="left__penSize">
        <div className="left__penSize-1px" role="button" tabIndex="0" onClick={() => { changePixelSize('1'); }}><i className="fas fa-square" /></div>
        <div className="left__penSize-2px" role="button" tabIndex="0" onClick={() => { changePixelSize('2'); }}><i className="fas fa-square" /></div>
        <div className="left__penSize-3px" role="button" tabIndex="0" onClick={() => { changePixelSize('3'); }}><i className="fas fa-square" /></div>
        <div className="left__penSize-4px" role="button" tabIndex="0" onClick={() => { changePixelSize('4'); }}><i className="fas fa-square" /></div>
      </div>
    );
  }
};

export default PenSizePanel;
