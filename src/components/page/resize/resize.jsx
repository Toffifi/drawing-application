/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import './resize.scss';
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from './resizeActions';

class Resize extends React.PureComponent {
  // static propTypes = {
  //   changeCanvasSize: PropTypes.func.isRequired,
  // }

  render() {
    // const { changeCanvasSize } = this.props;
    return (
      <section className="resize">
        <p>Resize</p>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedSize('32'); }}>32x32</div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedSize('64'); }}>64x64</div>
        <div role="button" tabIndex="0" onClick={() => { this.props.setSelectedSize('128'); }}>128x128</div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  selectedSize: state.size.selectedSize,
});

const mapDispatchToProps = dispatch => ({
  setSelectedSize: size => dispatch(actions.setSelectedSize(size)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resize);
