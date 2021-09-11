import './App.css';
import React from 'react';
import taskStore from './store/task';
import BaseComponent from './component/base';
import Home from './page/home';
import config from './config';

class App extends BaseComponent {
  render() {
    return (
      <Home />
    );
  }

  async componentDidMount() {
    if (!taskStore.isInitialized) {
      console.log('popup initialize all offline data...');
      taskStore.setName(config.couchDBName)
      await taskStore.initialize();
      console.log('popup done');
    }
  }
}

export default App;
