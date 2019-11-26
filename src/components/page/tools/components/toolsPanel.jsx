/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';


const ToolsPanel = class extends React.PureComponent {
  render() {
    return (
      <div className="left__tools">
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('brash'); }}><i className="fas fa-pencil-alt" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('mirror'); }}><i className="fas fa-compress" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('paintAll'); }}><i className="fas fa-paint-roller" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('paintSameColor'); }}><i className="fas fa-spray-can" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('paintBucket'); }}><i className="fas fa-fill-drip icon" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('eraser'); }}><i className="fas fa-eraser" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('stroke'); }}><i className="fas fa-minus" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('rectangle'); }}><i className="far fa-square" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('move'); }}><i className="fas fa-arrows-alt icon" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('lighten'); }}><i className="far fa-sun" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('darken'); }}><i className="far fa-moon" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('dithOdd'); }}><i className="fas fa-chess-board" /></div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedTool('clearAll'); }}><i className="far fa-sticky-note" /></div>
      </div>
    );
  }
};

export default ToolsPanel;
