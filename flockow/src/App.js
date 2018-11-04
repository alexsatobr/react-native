import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import Router from './Router';
// import { DangerZone, SplashScreen } from 'expo';
import { store, persistor } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

// const { Lottie } = DangerZone;

if (__DEV__) {
	require('react-devtools');
}


class App extends Component {
	renderLoading () {
		<View style={styles.container}>
			<ActivityIndicator size="large" />
		</View>
	}

	render() {
		return (
			<Provider store={store}>
			 	<PersistGate loading={this.renderLoading()} persistor={persistor}>
					<Router/>
				</PersistGate>
			</Provider>
		);
	}
}

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
}


export default App;
