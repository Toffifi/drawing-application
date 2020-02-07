/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */

import './page.scss';

import React from 'react';
import { connect } from 'react-redux';

import Tools from './tools/tools.jsx';
import Frames from './frames-list/frames-list.jsx';
import Canvas from './canvas/canvas.jsx';
import Preview from './preview/preview.jsx';
import Resize from './resize/resize.jsx';

import { actions } from './canvas/canvasActions';


class Page extends React.PureComponent {
  state = {
    image: 'null',
    count: 1,
    countCurFrame: 1,
    frameImage: null,
  };

  previewImageChanged = (imageData, countData) => {
    this.setState({ image: imageData });
    this.setState({ countCurFrame: countData });
    this.props.setCanvas({ image: imageData, frame: countData });
  }

  setMainCanvas = (fImage, fCount) => {
    this.setState({ frameImage: fImage });
    this.setState({ count: fCount });
  }

  render() {
    const { image } = this.state;
    const { count } = this.state;
    const { countCurFrame } = this.state;
    const { frameImage } = this.state;
    return (
      <section className="page">
        <Tools />
        <Frames
          image={image}
          countCurFrame={countCurFrame}
          setMainCanvas={this.setMainCanvas}
        />
        <Canvas
          count={count}
          frameImage={frameImage}
          previewImageChanged={this.previewImageChanged}
        />
        <Preview />
        <Resize changeCanvasSize={this.changeCanvasSize} />
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCanvas: payload => dispatch(actions.setCanvas(payload)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Page);
