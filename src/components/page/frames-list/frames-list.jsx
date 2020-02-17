/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */

import './frames-list.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Parent from './frames.jsx';
import Child from './frame.jsx';


class Frames extends React.PureComponent {
  static propTypes = {
    setMainCanvas: PropTypes.func.isRequired,
    countCurFrame: PropTypes.number.isRequired,
  }

  state = {
    numChildren: 1,
  }

  onAddChild = () => {
    this.setState({
      numChildren: this.state.numChildren + 1,
    });
  }

  getImageArray = () => {
    const imagesArr = [];
    for (let i = 0; i < this.children.length; i += 1) {
      if (this.children[i].props.image !== 'null') {
        imagesArr.push(this.children[i].props.image);
      }
    }
    return imagesArr;
  }

  render() {
    this.children = [];
    const { image } = this.props;
    const { setMainCanvas } = this.props;
    const { countCurFrame } = this.props;
    for (let i = 0; i < this.state.numChildren; i += 1) {
      this.children.push(<Child
        key={i + 1}
        count={i + 1}
        image={image}
        countCurFrame={countCurFrame}
        canvasSize={this.props.canvasSize}
        setMainCanvas={setMainCanvas}
      />);
    }
    return (
      <Parent addChild={this.onAddChild}>
        {this.children}
      </Parent>
    );
  }
}
const mapStateToProps = state => ({
  canvasSize: state.size.selectedCanvasSize,
});

export default connect(
  mapStateToProps,
)(Frames);
