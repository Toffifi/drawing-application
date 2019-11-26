/* eslint-disable import/extensions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './tools.scss';
import { actions } from './toolsActions';
import ColorPickerPanel from './components/colorPickerPanel.jsx';
import PenSizePanel from './components/penSizePanel.jsx';
import ToolsPanel from './components/toolsPanel.jsx';


const Tools = class extends React.PureComponent {
  static propTypes = {
    changePixelSize: PropTypes.func.isRequired,
  }

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
    return (
      <section className="left">
        <PenSizePanel changePixelSize={this.props.changePixelSize} />
        <ToolsPanel setSelectedTool={this.props.setSelectedTool} />
        <ColorPickerPanel
          setSelectedColor={this.props.setSelectedColor}
          selectedColor={this.props.selectedColor}
        />
      </section>
    );
  }
};

const mapStateToProps = state => ({
  selectedTool: state.tools.selectedTool,
  selectedColor: state.tools.selectedColor,
});

const mapDispatchToProps = dispatch => ({
  setSelectedTool: tool => dispatch(actions.setSelectedTool(tool)),
  setSelectedColor: color => dispatch(actions.setSelectedColor(color)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tools);
