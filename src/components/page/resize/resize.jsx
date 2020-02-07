/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import './resize.scss';
import React from 'react';
import { connect } from 'react-redux';
import { actions } from './resizeActions';

class Resize extends React.PureComponent {
  render() {
    return (
      <section className="resize">
        <p>Resize</p>
        <div role="button" tabIndex="0" onClick={() => { this.setSelectedCanvasSize('32'); }}>32x32</div>
        <div role="button" tabIndex="0" onClick={() => { this.setSelectedCanvasSize('64'); }}>64x64</div>
        <div role="button" tabIndex="0" onClick={() => { this.setSelectedCanvasSize('128'); }}>128x128</div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  selectedCanvasSize: state.size.selectedCanvasSize,
});

const mapDispatchToProps = dispatch => ({
  setSelectedCanvasSize: size => dispatch(actions.setSelectedCanvasSize(size)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resize);
