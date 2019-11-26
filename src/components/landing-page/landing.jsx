import './landing.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';

class Landing extends React.PureComponent {
  render() {
    return (
      <section className="landing">
        <div className="landing__button">
          <NavLink to="/drawing">Create sprite</NavLink>
        </div>
        <div className="landing__screenshot">
          <img src="https://i.ibb.co/nc4rwDK/screenshot.png" alt="screenshot" border="0" />
        </div>
        <div className="landing__example">
          <p>Example sprites:</p>
          <iframe title="This is a unique title" src="https://giphy.com/embed/LMcWUi2MzRwVMC2gOP" width="100" height="100" frameBorder="1" />
          <iframe title="This is a unique title" src="https://giphy.com/embed/WtOab5y3RrzH85939w" width="100" height="100" frameBorder="1" />
          <iframe title="This is a unique title" src="https://giphy.com/embed/dry9hW9QgXYQofbLfT" width="100" height="100" frameBorder="1" />
          <iframe title="This is a unique title" src="https://giphy.com/embed/L4OWBO9QFkLe0nJraM" width="100" height="100" frameBorder="1" />
          <iframe title="This is a unique title" src="https://giphy.com/embed/VIoWAzDhzi6FhRjg91" width="100" height="100" frameBorder="1" />
        </div>
        <div className="landing__link">
          <p>Original app:</p>
          <a href="https://www.piskelapp.com/"><img src="https://i.ibb.co/wpDRH1H/logo.png" alt="Piskel" /></a>
        </div>
      </section>
    );
  }
}
export default Landing;
