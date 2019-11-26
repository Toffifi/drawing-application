
import React from 'react';
import PropTypes from 'prop-types';

class Parent extends React.PureComponent {
  static propTypes = {
    addChild: PropTypes.func.isRequired,
    children: PropTypes.instanceOf(Array).isRequired,
  }

  handleKeyPress = (event) => {
    if (event.key === 'n') {
      const { addChild } = this.props;
      addChild();
    }
  }

  render() {
    const { addChild } = this.props;
    const { children } = this.props;
    return (
      <section className="frames">
        {children}
        <div
          className="frames__add"
          role="button"
          tabIndex={0}
          onClick={addChild}
          onKeyPress={this.handleKeyPress}
        >
          <i className="fas fa-plus" />
          <p> Add new frame</p>
        </div>
      </section>
    );
  }
}
export default Parent;
