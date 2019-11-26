/* eslint-disable import/extensions */

import './page.scss';

import React from 'react';

import Tools from './tools/tools.jsx';
import Frames from './frames-list/frames-list.jsx';
import Canvas from './canvas/canvas.jsx';
import Preview from './preview/preview.jsx';
import Resize from './resize/resize.jsx';


class Drawing extends React.PureComponent {
  state = {
    size: '1',
    canvasSize: '32',
    image: 'null',
    count: 1,
    countCurFrame: 1,
    frameImage: null,
  };

  changePixelSize = (value) => {
    this.setState({ size: value });
  }

  changeCanvasSize = (value) => {
    this.setState({ canvasSize: value });
  }

  previewImageChanged = (imageData, countData) => {
    this.setState({ image: imageData });
    this.setState({ countCurFrame: countData });
  }

  setMainCanvas = (fImage, fCount) => {
    this.setState({ frameImage: fImage });
    this.setState({ count: fCount });
  }

  render() {
    const { size } = this.state;
    const { canvasSize } = this.state;
    const { image } = this.state;
    const { count } = this.state;
    const { countCurFrame } = this.state;
    const { frameImage } = this.state;
    return (
      <section className="page">
        <Tools
          changePixelSize={this.changePixelSize}
        />
        <Frames
          image={image}
          countCurFrame={countCurFrame}
          canvasSize={canvasSize}
          setMainCanvas={this.setMainCanvas}
        />
        <Canvas
          size={size}
          count={count}
          frameImage={frameImage}
          canvasSize={canvasSize}
          previewImageChanged={this.previewImageChanged}
        />
        <Preview
          frameImage={image}
          frameNum={countCurFrame}
          canvasSize={canvasSize}
        />
        <Resize changeCanvasSize={this.changeCanvasSize} />
      </section>
    );
  }
}

export default Drawing;
