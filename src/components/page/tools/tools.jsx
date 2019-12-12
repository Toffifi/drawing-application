/* eslint-disable import/extensions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import './tools.scss';
import { actions } from './toolsActions';
import ColorPickerPanel from './components/colorPickerPanel.jsx';
import PenSizePanel from './components/penSizePanel.jsx';
import ToolsPanel from './components/toolsPanel.jsx';


const Tools = class extends React.PureComponent {
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
        <PenSizePanel setSelectedPenSize={this.props.setSelectedPenSize} />
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
  selectedPenSize: state.tools.selectedPenSize,
});

const mapDispatchToProps = dispatch => ({
  setSelectedTool: tool => dispatch(actions.setSelectedTool(tool)),
  setSelectedColor: color => dispatch(actions.setSelectedColor(color)),
  setSelectedPenSize: penSize => dispatch(actions.setSelectedPenSize(penSize)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tools);
