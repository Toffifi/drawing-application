/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */

import './frames-list.scss';
import React from 'react';
import PropTypes from 'prop-types';

import Parent from './frames.jsx';
import Child from './frame.jsx';


class Frames extends React.PureComponent {
  static propTypes = {
    image: PropTypes.instanceOf(Object).isRequired,
    canvasSize: PropTypes.string.isRequired,
    setMainCanvas: PropTypes.func.isRequired,
    countCurFrame: PropTypes.number.isRequired,
  }

  state = {
    numChildren: 1,
    count: 1,
    frameImg: null,
  }

  onAddChild = () => {
    this.setState({
      numChildren: this.state.numChildren + 1,
    });
  }

  setMainCanvas = (fimage, fcount) => {
    this.setState({ count: fcount });
    this.setState({ frameImg: fimage });
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
    const { canvasSize } = this.props;
    const { setMainCanvas } = this.props;
    const { count } = this.state;
    const { countCurFrame } = this.props;
    const { frameImg } = this.state;
    for (let i = 0; i < this.state.numChildren; i += 1) {
      this.children.push(<Child
        key={i + 1}
        count={i + 1}
        image={image}
        countCurFrame={countCurFrame}
        canvasSize={canvasSize}
        setMainCanvas={this.setMainCanvas}
      />);
      setMainCanvas(frameImg, count);
    }
    return (
      <Parent addChild={this.onAddChild}>
        {this.children}
      </Parent>
    );
  }
}
export default Frames;
