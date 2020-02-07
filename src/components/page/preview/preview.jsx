/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './preview.scss';

import React from 'react';
import { connect } from 'react-redux';

class Preview extends React.PureComponent {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.framesArr = [];
    this.curframe = 1;
    this.intervalID = -1;
    this.paintAllCanvas = this.paintAllCanvas.bind(this);
  }

  componentWillMount() {
    this.startTimer(1000);
  }

  startTimer = (fps) => {
    if (this.intervalID > -1) {
      clearInterval(this.intervalID);
    }
    this.intervalID = setInterval(() => {
      if (this.curframe > this.props.canvas.length) {
        this.curframe = 1;
      }
      const frame = this.props.canvas.find(c => c.frame === this.curframe);
      if (frame != null) {
        const canvas = this.canvasRef.current;
        if (canvas != null) {
          const ctx = canvas.getContext('2d');
          this.paintAllCanvas();
          ctx.putImageData(frame.image, 0, 0);
          this.curframe += 1;
        }
      }
    }, fps);
  }

  paintAllCanvas = () => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const id = ctx.createImageData(canvas.width, canvas.height);
    const d = id.data;
    for (let i = 0; i < canvas.width * canvas.height * 4; i += 1) {
      d[i] = 0;
    }
    ctx.putImageData(id, 0, 0);
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
  canvas: state.canvas.canvas,
});

export default connect(
  mapStateToProps,
)(Preview);
