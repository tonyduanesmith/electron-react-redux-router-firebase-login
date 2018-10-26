import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux'
import BrowserWrapper from './BrowserWrapper'
import store from './store'

class App extends Component {
  render(){
    return (
      <Fragment>
        <Provider store={store}>
          <BrowserWrapper />
        </Provider>
      </Fragment>
    );
  }
};

export default App;