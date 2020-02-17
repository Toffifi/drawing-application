/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */

import './canvas.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Canvas extends React.Component {
  static propTypes = {
    previewImageChanged: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    frameImage: PropTypes.instanceOf(Object),
  }


  constructor(props) {
    super(props);
    this.state = {
      count: this.props.count,
      frameImage: this.props.frameImage,
    };
    this.canvasRef = React.createRef();
    this.canvasBackRef = React.createRef();
    this.isMouseDown = false;
    this.lastFrame = 1;
    this.EraserColor = {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
    };
    this.paintedcor = [];
  }


  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { previewImageChanged } = this.props;
    previewImageChanged(ctx.getImageData(0, 0, this.canvasRef.current.width,
      this.canvasRef.current.height), this.lastFrame);
    this.initCanvas();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { previewImageChanged } = this.props;
    if (snapshot && snapshot.canvasBeforeResize && canvas) {
      ctx.putImageData(snapshot.canvasBeforeResize, 0, 0);
      previewImageChanged(ctx.getImageData(0, 0, this.canvasRef.current.width,
        this.canvasRef.current.height), this.lastFrame);
    }
    if (this.lastFrame !== this.state.count) {
      this.lastFrame = this.state.count;
      if (this.state.frameImage) {
        this.paintAllCanvas(true);
        ctx.putImageData(this.state.frameImage, 0, 0);
      } else {
        this.paintAllCanvas(true);
      }
      previewImageChanged(ctx.getImageData(0, 0, this.canvasRef.current.width,
        this.canvasRef.current.height), this.lastFrame);
    }
    this.initCanvas();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const snapshot = {};
    if (prevProps.canvasSize !== this.props.canvasSize) {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      snapshot.canvasBeforeResize = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    return Object.keys(snapshot).length ? snapshot : null;
  }

  static getDerivedStateFromProps(props, state) {
    const nextState = {};
    if (props.count !== state.count) {
      nextState.count = props.count;
    }
    if (props.frameImage !== state.frameImage) {
      nextState.frameImage = props.frameImage;
    }
    return Object.keys(nextState).length ? nextState : null;
  }


  paintAllCanvas = (erase) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const id = ctx.createImageData(canvas.width, canvas.height);
    const d = id.data;
    const colorObj = erase === true ? this.EraserColor : this.props.selectedColor;
    for (let i = 0; i < canvas.width * canvas.height; i += 1) {
      d[i * 4] = colorObj.r;
      d[(i * 4) + 1] = colorObj.g;
      d[(i * 4) + 2] = colorObj.b;
      d[(i * 4) + 3] = colorObj.a;
    }
    ctx.putImageData(id, 0, 0);
  }

  brushTool = (ctx, x, y, loc) => {
    const size = this.props.selectedPenSize;
    const tool = this.props.selectedTool;
    const id = ctx.createImageData(size, size);
    const d = id.data;
    let CorX = 0;
    let CorY = 0;
    CorX = Math.floor(size / 2);
    CorY = Math.floor(size / 2);
    if (size % 2 === 1 || loc === null) {
      CorX = Math.floor(size / 2);
      CorY = Math.floor(size / 2);
    } else {
      CorX = loc.xq === 0 ? size / 2 : (size / 2) - 1;
      CorY = loc.yq === 0 ? size / 2 : (size / 2) - 1;
    }
    const putX = x - CorX;
    const putY = y - CorY;
    let colorObj = tool === 'eraser' ? this.EraserColor : this.props.selectedColor;
    for (let i = 0; i < (size ** 2) * 4; i += 4) {
      const coorX = putX + ((i / 4) % size);
      const coorY = putY + Math.floor((i / 4) / size);
      if (tool === 'lighten' || tool === 'darken') {
        colorObj = this.getColorForLighten(coorX, coorY);
      } else if (tool === 'dithOdd') {
        if (coorX % 2 === coorY % 2) {
          colorObj = this.props.selectedColor;
        } else {
          colorObj = this.EraserColor;
        }
      } else if (tool === 'dithEven') {
        if (coorX % 2 !== coorY % 2) {
          colorObj = this.props.selectedColor;
        } else {
          colorObj = this.EraserColor;
        }
      }
      d[i + 0] = colorObj.r;
      d[i + 1] = colorObj.g;
      d[i + 2] = colorObj.b;
      d[i + 3] = colorObj.a;
    }
    ctx.putImageData(id, putX, putY);
  }

  paintTool = (tx, ty, startColor, ctx) => {
    if (tx >= 0 && ty >= 0 && tx <= this.canvasRef.current.width
      && ty <= this.canvasRef.current.height) {
      let allGood = true;
      this.paintedcor.forEach((e) => {
        if (e.x === tx && e.y === ty) {
          allGood = false;
        }
      });
      if (allGood === true) {
        const index = this.getIndexByCor(tx, ty);
        const d = this.savedImageData.data;
        const pxColor = {
          r: d[index],
          g: d[index + 1],
          b: d[index + 2],
          a: d[index + 3],
        };
        if (startColor.r >= pxColor.r - 15 && startColor.r <= pxColor.r + 15
          && startColor.g >= pxColor.g - 15 && startColor.g <= pxColor.g + 15
          && startColor.b >= pxColor.b - 15 && startColor.b <= pxColor.b + 15) {
          const id = ctx.createImageData(1, 1);
          const dat = id.data;
          dat[0] = this.props.selectedColor.r;
          dat[1] = this.props.selectedColor.g;
          dat[2] = this.props.selectedColor.b;
          dat[3] = 255;
          ctx.putImageData(id, tx, ty);
          const cor = {
            x: tx,
            y: ty,
          };
          this.paintedcor.push(cor);
          this.paintTool(tx + 1, ty, startColor, ctx);
          this.paintTool(tx, ty + 1, startColor, ctx);
          this.paintTool(tx - 1, ty, startColor, ctx);
          this.paintTool(tx, ty - 1, startColor, ctx);
        }
      }
    }
  }

  paintSameColor = (startColor, ctx) => {
    const img = ctx.getImageData(0, 0, this.canvasRef.current.width, this.canvasRef.current.height);
    const d = img.data;
    const px = ctx.createImageData(1, 1);
    const dat = px.data;
    dat[0] = this.props.selectedColor.r;
    dat[1] = this.props.selectedColor.g;
    dat[2] = this.props.selectedColor.b;
    dat[3] = 255;
    for (let x = 0; x < this.canvasRef.current.width; x += 1) {
      for (let y = 0; y < this.canvasRef.current.height; y += 1) {
        const ind = this.getIndexByCor(x, y);
        if (d[ind] === startColor.r && d[ind + 1] === startColor.g
          && d[ind + 2] === startColor.b) {
          ctx.putImageData(px, x, y);
        }
      }
    }
  }

  getIndexByCor = (x, y) => {
    const canvas = this.canvasRef.current;
    return (canvas.height * y + x) * 4;
  }

  getColorForLighten = (x, y) => {
    const index = this.getIndexByCor(x, y);
    const d = this.savedImageData.data;
    const tool = this.props.selectedTool;
    let o = null;
    if (tool === 'lighten') {
      o = {
        r: d[index] + 50 > 255 ? 255 : d[index] + 50,
        g: d[index + 1] + 50 > 255 ? 255 : d[index + 1] + 50,
        b: d[index + 2] + 50 > 255 ? 255 : d[index + 2] + 50,
        a: d[index + 3],
      };
    } else if (tool === 'darken') {
      o = {
        r: d[index] - 50 < 0 ? 0 : d[index] - 50,
        g: d[index + 1] - 50 < 0 ? 0 : d[index + 1] - 50,
        b: d[index + 2] - 50 < 0 ? 0 : d[index + 2] - 50,
        a: d[index + 3],
      };
    }
    return o;
  }

  drawLine = (ctx, loc, locStart) => {
    const Twidth = Math.abs(loc.x - locStart.x);
    const Theight = Math.abs(loc.y - locStart.y);
    let StartX;
    let StartY;
    let mult;
    let max;
    if (Twidth > Theight) {
      mult = Theight / Twidth;
      if (locStart.x < loc.x) {
        StartX = locStart.x;
        StartY = locStart.y;
        max = loc.x - locStart.x;
        if (locStart.y > loc.y) {
          mult *= -1;
        }
      } else {
        StartX = loc.x;
        StartY = loc.y;
        max = locStart.x - loc.x;
        if (loc.y > locStart.y) {
          mult *= -1;
        }
      }
    } else {
      mult = Twidth / Theight;
      if (locStart.y < loc.y) {
        StartX = locStart.x;
        StartY = locStart.y;
        max = loc.y - locStart.y;
        if (locStart.x > loc.x) {
          mult *= -1;
        }
      } else {
        StartX = loc.x;
        StartY = loc.y;
        max = locStart.y - loc.y;
        if (loc.x > locStart.x) {
          mult *= -1;
        }
      }
    }
    for (let i = 1; i <= max; i += 1) {
      const x = Twidth > Theight ? StartX + i : StartX + Math.round(i * mult);
      const y = Twidth > Theight ? StartY + Math.round(i * mult) : StartY + i;
      this.brushTool(ctx, x, y, null);
    }
  }

  drawRect = (ctx, loc, locStart) => {
    const StartX = locStart.x < loc.x ? locStart.x : loc.x;
    const EndX = locStart.x < loc.x ? loc.x : locStart.x;
    const StartY = locStart.y < loc.y ? locStart.y : loc.y;
    const EndY = locStart.y < loc.y ? loc.y : locStart.y;
    for (let i = StartX; i <= EndX; i += 1) {
      this.brushTool(ctx, i, StartY, null);
      this.brushTool(ctx, i, EndY, null);
    }
    for (let i = StartY; i <= EndY; i += 1) {
      this.brushTool(ctx, StartX, i, null);
      this.brushTool(ctx, EndX, i, null);
    }
  }

  colorPick = (ctx, x, y) => {
    const px = ctx.getImageData(x, y, 1, 1).data;
    return {
      r: px[0],
      g: px[1],
      b: px[2],
      a: px[3],
    };
  }

  GetMousePosition = (x, y) => {
    const canvas = this.canvasRef.current;
    const canvasSizeData = canvas.getBoundingClientRect();
    const pxX = (x - canvasSizeData.left) / (canvasSizeData.width / canvas.width);
    const pxY = (y - canvasSizeData.top) / (canvasSizeData.height / canvas.height);
    const pxXr = Math.floor(pxX);
    const pxYr = Math.floor(pxY);
    return {
      x: pxXr,
      y: pxYr,
      xq: pxX - pxXr < 0.5 ? 0 : 1,
      yq: pxY - pxYr < 0.5 ? 0 : 1,
    };
  }

  onMouseDown = (e) => {
    this.isMouseDown = true;
    const canvas = this.canvasRef.current;
    const loc = this.GetMousePosition(e.clientX, e.clientY);
    const ctx = canvas.getContext('2d');
    const tool = this.props.selectedTool;
    if (tool === 'brash' || tool === 'eraser'
      || tool === 'dithOdd' || tool === 'dithEven') {
      this.brushTool(ctx, loc.x, loc.y, loc);
      this.startLoc = loc;
    } else if (tool === 'stroke' || tool === 'rectangle') {
      this.savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      this.startLoc = loc;
    } else if (tool === 'paintAll') {
      this.paintAllCanvas(false);
    } else if (tool === 'clearAll') {
      this.paintAllCanvas(true);
    } else if (tool === 'lighten' || tool === 'darken') {
      this.savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      this.brushTool(ctx, loc.x, loc.y, loc);
      this.startLoc = loc;
    } else if (tool === 'paintBucket') {
      this.savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      this.paintedcor = [];
      const index = this.getIndexByCor(loc.x, loc.y);
      const startPxColor = {
        r: this.savedImageData.data[index],
        g: this.savedImageData.data[index + 1],
        b: this.savedImageData.data[index + 2],
        a: this.savedImageData.data[index + 3],
      };
      this.paintTool(loc.x, loc.y, startPxColor, ctx);
    } else if (tool === 'mirror') {
      const mirrorX = canvas.width - (loc.x + 1);
      this.brushTool(ctx, loc.x, loc.y, loc);
      this.brushTool(ctx, mirrorX, loc.y, loc);
      this.startLoc = loc;
    } else if (tool === 'paintSameColor') {
      const origColor = this.colorPick(ctx, loc.x, loc.y);
      this.paintSameColor(origColor, ctx);
    } else if (tool === 'move') {
      this.startLoc = loc;
      this.savedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  };

  onMouseUp = () => {
    const { previewImageChanged } = this.props;
    const ctx = this.canvasRef.current.getContext('2d');
    this.isMouseDown = false;
    ctx.beginPath();
    previewImageChanged(ctx.getImageData(0, 0, this.canvasRef.current.width,
      this.canvasRef.current.height), this.lastFrame);
  };

  onMouseMove = (e) => {
    if (this.isMouseDown === true) {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      const loc = this.GetMousePosition(e.clientX, e.clientY);
      const tool = this.props.selectedTool;
      if (tool === 'brash' || tool === 'eraser'
        || tool === 'dithOdd' || tool === 'dithEven') {
        this.brushTool(ctx, loc.x, loc.y, loc);
        this.drawLine(ctx, loc, this.startLoc);
        this.startLoc = loc;
      } else if (tool === 'stroke') {
        ctx.putImageData(this.savedImageData, 0, 0);
        this.brushTool(ctx, this.startLoc.x, this.startLoc.y, null);
        this.drawLine(ctx, loc, this.startLoc);
      } else if (tool === 'rectangle') {
        ctx.putImageData(this.savedImageData, 0, 0);
        this.drawRect(ctx, loc, this.startLoc);
      } else if (tool === 'colorPicker') {
        this.color = this.colorPick(ctx, loc.x, loc.y);
      } else if (tool === 'lighten' || tool === 'darken') {
        this.brushTool(ctx, loc.x, loc.y, loc);
        this.drawLine(ctx, loc, this.startLoc);
        this.startLoc = loc;
      } else if (tool === 'mirror') {
        const mirrorX = canvas.width - (loc.x + 1);
        const mirrorStartLoc = {
          x: canvas.width - (this.startLoc.x + 1),
          y: this.startLoc.y,
          xq: this.startLoc.xq,
          yq: this.startLoc.yq,
        };
        const mirrorLoc = {
          x: canvas.width - (loc.x + 1),
          y: loc.y,
          xq: loc.xq,
          yq: loc.yq,
        };
        this.brushTool(ctx, loc.x, loc.y, loc);
        this.drawLine(ctx, loc, this.startLoc);
        this.brushTool(ctx, mirrorX, loc.y, loc);
        this.drawLine(ctx, mirrorLoc, mirrorStartLoc);
        this.startLoc = loc;
      } else if (tool === 'move') {
        this.paintAllCanvas(true);
        ctx.putImageData(this.savedImageData, loc.x - this.startLoc.x, loc.y - this.startLoc.y);
      }
    }
  };

  initCanvas = () => {
    const ctx = this.canvasBackRef.current.getContext('2d');
    for (let i = 0; i < this.props.canvasSize; i += 1) {
      for (let y = 0; y < this.props.canvasSize; y += 1) {
        const id = ctx.createImageData(this.props.selectedPenSize, this.props.selectedPenSize);
        const d = id.data;
        const col = y % 2 === i % 2 ? 100 : 75;
        d[0] = col;
        d[1] = col;
        d[2] = col;
        d[3] = 255;
        ctx.putImageData(id, i, y);
      }
    }
  }

  render() {
    return (
      <section className="canvas">
        <canvas
          width={this.props.canvasSize}
          height={this.props.canvasSize}
          className="canvas__main"
          ref={this.canvasRef}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
        />
        <canvas
          width={this.props.canvasSize}
          height={this.props.canvasSize}
          className="canvas__background"
          ref={this.canvasBackRef}
        />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  selectedTool: state.tools.selectedTool,
  selectedColor: state.tools.selectedColor,
  selectedPenSize: state.tools.selectedPenSize,
  canvasSize: state.size.selectedCanvasSize,
});

export default connect(
  mapStateToProps,
)(Canvas);
