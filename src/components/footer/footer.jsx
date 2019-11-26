import './footer.scss';

import React from 'react';

class Footer extends React.PureComponent {
  render() {
    return (
      <footer>
        <p>
Created by
          {' '}
          <a href="https://github.com/Toffifi">Aleksandra Kovaleva</a>
          {' '}
© 2019
        </p>
      </footer>
    );
  }
}
export default Footer;
