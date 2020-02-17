/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Child extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    setMainCanvas: PropTypes.func.isRequired,
    countCurFrame: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const id = ctx.createImageData(canvas.width, canvas.height);
    const d = id.data;
    d[0] = 0;
    d[1] = 0;
    d[2] = 0;
    d[3] = 0;
    ctx.putImageData(id, 0, 0);
    this.frameImage = ctx.createImageData(canvas.width, canvas.height);
  }

  componentWillUpdate() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    this.lastImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    const { image } = this.props;
    const { count } = this.props;
    const { countCurFrame } = this.props;
    const ctx = canvas.getContext('2d');
    if (canvas !== null && countCurFrame === count) {
      ctx.putImageData(image, 0, 0);
      this.frameImage = image;
    } else {
      ctx.putImageData(this.lastImage, 0, 0);
    }
  }

  render() {
    const { count } = this.props;
    const { setMainCanvas } = this.props;
    return (
      <div className="frames__frame">
        <div className="frames__frame-top">
          <div className="count">
            {count}
          </div>
          <div className="delete"><i className="fas fa-trash" /></div>
        </div>
        <canvas ref={this.canvasRef} width={this.props.canvasSize} height={this.props.canvasSize} role="button" tabIndex="0" onClick={() => setMainCanvas(this.frameImage, count)} />
        <div className="frames__frame-bottom">
          <div>
            <i className="fas fa-grip-vertical" />
          </div>
          <div>
            <i className="fas fa-copy" />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  canvasSize: state.size.selectedCanvasSize,
});

export default connect(
  mapStateToProps,
)(Child);
