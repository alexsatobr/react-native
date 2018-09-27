import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: false };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyD4rvXMNt4pM-XwvYyG8_d3aRKna-YV7yg',
            authDomain: 'react-native-8b6dd.firebaseapp.com',
            databaseURL: 'https://react-native-8b6dd.firebaseio.com',
            projectId: 'react-native-8b6dd',
            storageBucket: 'react-native-8b6dd.appspot.com',
            messagingSenderId: '533233083858'
		});
		
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}
	
	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<CardSection>
						<Button onPress={() => firebase.auth().signOut()} >Log Out</Button>
					</CardSection>
				);
			case false:
				return <LoginForm />;
			default:
				return <Spinner size="large" />;
			}
	}

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

export default App;
