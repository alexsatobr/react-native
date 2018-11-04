import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
// import { getUserInfo } from '../actions/userInfoActions';
// import { loginSession } from '../actions/authActions';

@connect(state => ({
	firstAccess: state.firstAccess
}), () => ({}))
export default class Splash extends Component {
	// constructor() {
	// 	super();
		// this.state = {
		// 	intro: true,
		// 	isReady: false
		// };
	// }

	// componentWillMount() {
	// 	try {
	// 		// AsyncStorage.clear();
	// 		AsyncStorage.multiGet(['firstAccess', 'x-auth']).then((val) => {
	// 			if (val) {
	// 				const isFirstAccess = val[0][1];
	// 				const authToken = val[1][1];

	// 				if (isFirstAccess === null) {
	// 					AsyncStorage.setItem('firstAccess', 'false');
	// 					this.setState({
	// 						isLoaded: true,
	// 						isReady: true
	// 					});
	// 				} 
	// 				if (authToken !== null) {
	// 					this.setState({
	// 						isLogged: true,
	// 						intro: false
	// 					})
	// 					console.log('x-auth', val[1][1]);
	// 					this.props.getUserInfo(authToken)
	// 					this.props.loginSession()
	// 				}

	// 			} else {
	// 				console.log('second');
	// 				AsyncStorage.setItem('firstAccess', 'false');
	// 				this.setState({
	// 					isLoaded: true,
	// 					isReady: true
	// 				});
	// 				// this.setState({ isReady: true, intro: false });
	// 			}
	// 		}).catch(e => console.log(e));
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

	componentDidMount () {
		const { firstAccess, navigation } = this.props; 
		setTimeout(() => {
			if (firstAccess) {
				return navigation.navigate('Intro');
			}
			return navigation.navigate('NovoPorAqui');
		}, 4000);
	}

 	render() {
		return (
			<View style={styles.container}>
				<View style={styles.image_container}>
					<Image style={styles.image} source={require('../../assets/img/logo.png')} />
				</View>
			</View>
		);
  	}
}

const styles = {
	container: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: '#ffffff'
	},
	image_container: {
		display: 'flex',
		width: 200,
		height: 200,
		alignItems: 'center'
	},
	image: {
		display: 'flex',
		flex: 1,
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20,
		resizeMode: 'contain'
	},
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

