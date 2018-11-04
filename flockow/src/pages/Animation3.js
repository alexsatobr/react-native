import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Constants, LinearGradient } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';
// import { DangerZone } from 'expo';

// const { Lottie } = DangerZone;
const { width } = Dimensions.get('window')

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
	},
	textbutton: {
		paddingRight: 10,
	},
	icon: {
		backgroundColor: 'transparent',
		color: '#655ba7',
		marginTop: 60,
		fontSize: 24,
	},
	position: {
		position: 'absolute',
		bottom: 50,
	},
	lottie: {
		width: '100%',
		height: '100%'
	},
	animView: {
		height: 450
	}
};

export default class Animation3 extends Component {
	componentDidMount() {
		setTimeout(() => {
			this.props.navigation.navigate('Intro');
		}, 4200);
	}

	render() {
		return (
			<View style={styles.container}>
				<LinearGradient
					colors={['#211f5d', '#4e3090']}
					style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
				/>
				<View style={styles.animView}>
					<LottieView
						source={require('../../assets/json/logo-fkw-script.json')}
						autoPlay
						loop
						style={styles.lottie}
						resizeMode="cover"
					/>
				</View>
				{/* <TouchableOpacity style={styles.position} onPress={() => { }}>
					<View>
						<Icon style={styles.icon}>
							<Text style={styles.textbutton}>Pular  </Text>
							<Icon name="arrow-right" style={{ fontSize: 20 }} />
						</Icon>
					</View>
				</TouchableOpacity> */}
			</View>
		);
	}
}

