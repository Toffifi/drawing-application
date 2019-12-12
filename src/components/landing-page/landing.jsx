import './landing.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';
import gif1 from '../images/color pattern clone.gif';
import gif2 from '../images/Panda.gif';
import gif3 from '../images/Megaman moving.gif';
import gif4 from '../images/llama.gif';
import gif5 from '../images/Stormtrooper helmet (dithered).gif';
import screenshot from '../images/screenshot.png';
import logo from '../images/logo.png';


class Landing extends React.PureComponent {
  render() {
    return (
      <section className="landing">
        <div className="landing__button">
          <NavLink to="/drawing">Create sprite</NavLink>
        </div>
        <div className="landing__screenshot">
          <img src={screenshot} alt="screenshot" border="0" />
        </div>
        <div className="landing__example">
          <p>Example sprites:</p>
          <img src={gif1} alt="gif" width="100" height="100" />
          <img src={gif2} alt="gif" width="100" height="100" />
          <img src={gif3} alt="gif" width="100" height="100" />
          <img src={gif4} alt="gif" width="100" height="100" />
          <img src={gif5} alt="gif" width="100" height="100" />
        </div>
        <div className="landing__link">
          <p>Original app:</p>
          <a href="https://www.piskelapp.com/"><img src={logo} alt="Piskel" /></a>
        </div>
      </section>
    );
  }
}
export default Landing;
