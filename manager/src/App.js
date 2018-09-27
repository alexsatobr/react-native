import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
		apiKey: 'AIzaSyD4rvXMNt4pM-XwvYyG8_d3aRKna-YV7yg',
		authDomain: 'react-native-8b6dd.firebaseapp.com',
		databaseURL: 'https://react-native-8b6dd.firebaseio.com',
		projectId: 'react-native-8b6dd',
		storageBucket: 'react-native-8b6dd.appspot.com',
		messagingSenderId: '533233083858'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
