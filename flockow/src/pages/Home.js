import React, { Component } from 'react';
import { Text, Button, Modal, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
// import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card } from '../components/common';

class Home extends Component {
	state = {
		modalVisible: false,
	};
	
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		return (
		<Card style={{textAlign: 'center'}}>
			<Text>Home</Text>
			<Button
				onPress={() => {
					// this.setModalVisible(true);
					this.props.navigation.navigate('Config');
				}}
				title="Configurações"
				color="#841584"
				accessibilityLabel="Configurações do aplicativo"
			/>
		</Card>
		);
	}
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = () => {
//   const { email, password, error, loading } = auth;

//   return { email, password, error, loading };
	return {};
};

export default connect(mapStateToProps)(Home);
