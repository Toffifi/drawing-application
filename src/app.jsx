/* eslint-disable import/extensions */

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header/header.jsx';
import Landing from './components/landing-page/landing.jsx';
import Page from './components/page/page.jsx';
import Footer from './components/footer/footer.jsx';


class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <main>
          <header><Header /></header>
          <Route exact path="/" component={Landing} />
          <Route path="/drawing" component={Page} />
          <Footer />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
