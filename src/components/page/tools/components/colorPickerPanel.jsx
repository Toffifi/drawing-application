/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';


const ColorPickerPanel = class extends React.PureComponent {
  state = {
    displayColorPicker: false,
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: '50px',
          height: '50px',
          background: `rgba(${this.props.selectedColor.r}, ${this.props.selectedColor.g}, ${this.props.selectedColor.b}, ${this.props.selectedColor.a})`,
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return (
      <div className="left__color">
        <div className="left__color-primary" onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        { this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.props.selectedColor}
              onChange={color => this.props.setSelectedColor(color.rgb)}
            />
          </div>
        ) : null }
      </div>
    );
  }
};

export default ColorPickerPanel;
