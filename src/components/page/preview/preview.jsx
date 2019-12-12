/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './preview.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Preview extends React.PureComponent {
  static propTypes = {
    frameImage: PropTypes.instanceOf(Object).isRequired,
    frameNum: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.framesArr = [];
    this.curframe = 1;
    this.intervalID = -1;
  }

  componentWillMount() {
    this.startTimer(1000);
  }

  componentDidUpdate() {
    const { frameImage } = this.props;
    const { frameNum } = this.props;
    if (frameImage !== null && typeof (frameImage) !== 'undefined') {
      let contains = false;
      const frameObj = {
        num: frameNum,
        img: frameImage,
      };
      for (let i = 0; i < this.framesArr.length; i += 1) {
        if (this.framesArr[i].num === frameNum) {
          contains = true;
          this.framesArr[i] = frameObj;
        }
      }
      if (contains === false) {
        this.framesArr.push(frameObj);
      }
    }
  }

  startTimer = (fps) => {
    if (this.intervalID > -1) {
      clearInterval(this.intervalID);
    }
    this.intervalID = setInterval(() => {
      if (this.curframe > this.framesArr.length) {
        this.curframe = 1;
      }
      let contains = false;
      let frame = null;
      for (let i = 0; i < this.framesArr.length; i += 1) {
        if (this.framesArr[i].num === this.curframe) {
          contains = true;
          frame = this.framesArr[i].img;
        }
      }
      const canvas = this.canvasRef.current;
      if (contains === true && canvas != null) {
        const ctx = canvas.getContext('2d');
        ctx.putImageData(frame, 0, 0);
        this.curframe += 1;
      }
    }, fps);
  }


  render() {
    const { canvasSize } = this.props;
    return (
      <section className="preview">
        <div className="preview__container">
          <canvas className="preview__container-canvas" height={canvasSize} width={canvasSize} ref={this.canvasRef} />
        </div>
        <div className="preview__buttons">
          <div className="preview__buttons-2fps" role="button" tabIndex={0} onClick={() => this.startTimer(500)}>2FPS</div>
          <div className="preview__buttons-4fps" role="button" tabIndex={0} onClick={() => this.startTimer(250)}>4FPS</div>
          <div className="preview__buttons-8fps" role="button" tabIndex={0} onClick={() => this.startTimer(125)}>8FPS</div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  canvasSize: state.size.selectedCanvasSize,
});

export default connect(
  mapStateToProps,
)(Preview);
