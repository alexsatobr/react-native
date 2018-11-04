import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { Constants, LinearGradient } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
// import { DangerZone } from 'expo';

// const { Lottie } = DangerZone;
// import { emailChanged, passwordChanged, loginUser } from '../actions';
// import { Card } from './common';

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1'
	},
	image: {
		width: 195,
		height: 240,
		marginTop: 0
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		marginTop: 60,
		fontSize: 16
	},
	buttonLogin: {
		height: 48,
		width: 240,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		marginTop: 10
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	},
	icon: {
		backgroundColor: 'transparent',
		color: '#655ba7',
		marginTop: 22,
		fontSize: 18,
	},
	lottie: {
		width: 300,
		marginTop: 5,
	},
	textbutton: {
		paddingRight: 5,
	}
};

export default class NovoPorAqui extends Component {
	handlePress() {
		this.props.navigation.navigate('Funcionalidades');
	}
	render() {
		return (
			<View style={styles.container}>
				<LinearGradient
					colors={['#211f5d', '#4e3090']}
					style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
				/>
				{/* <Image style={styles.image} source={require('../../assets/flockowNovo.png')} /> */}
				<LottieView
					source={require('../../assets/json/logo-fkw.json')}
					autoPlay
					loop={false}
					style={styles.lottie}
				/>
				<Text style={styles.text}>NOVO POR AQUI?</Text>
				<LinearGradient colors={['#d14997', '#5b398e']} start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={this.handlePress.bind(this)}>
						<Text style={styles.buttonText}>VAMOS COMEÇAR JÁ!</Text>
					</TouchableOpacity>
				</LinearGradient>
				<TouchableOpacity>
					<View>
						<Icon style={styles.icon}>
							<Text style={styles.textbutton}>Já possui conta? Logue-se</Text>
							<Icon name="arrow-right" style={{ fontSize: 20 }} />
						</Icon>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

