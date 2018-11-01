import React, { Component } from 'react';
import { Text, TextInput, TouchableHighlight, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Expo from 'expo';

import fbConfig from '../config/fbConfig';
import googleConfig from '../config/googleConfig';

import { login } from '../actions/authActions';
import { getUserInfo } from '../actions/userInfoActions';

@connect(state => ({
	isLogged: state.auth.isLogged,
	isLoading: state.auth.isLoading,
	user: state.auth.info,
	token: state.auth.token
}), { login, getUserInfo })
export default class SocialLogin extends Component {
	constructor (props) {
		super(props)
		this.state = {
			text: 'Oi',
			isLogged: false
		}
		this.loginGoogle = this.loginGoogle.bind(this);
		this.loginFacebook = this.loginFacebook.bind(this);
		this.persistStorage = this.persistStorage.bind(this);
	}

	async loginFacebook () {
		const { login, navigation } = this.props;
		const xauth = this.props.token;
		const {type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(fbConfig.APP_ID, {
			permissions: ['public_profile', 'email'],
		});
		console.log('token!!', token, type);
		if(type === 'success') {
			await login(token, 'facebook');
			await getUserInfo(xauth)
			console.log(xauth)
			// this.persistStorage(this.props.token);
			// AsyncStorage.getItem('x-auth').then(val => console.log(val));
			navigation.goBack();

			// AsyncStorage.getItem('x-auth'));
			// const resp = await fetch(`https://graph.facebook.com/me/access_token=${token}`);
		} else {
			throw new Error('Something is wrong with facebook auth!');
		}

	}

	async loginGoogle () {
		const { login, token, getUserInfo, navigation } = this.props;
		const {type, accessToken} = await Expo.Google.logInAsync({
			androidClientId: googleConfig.CLIENT_ID_ANDROID,
			iosClientId: googleConfig.CLIENT_ID_IOS,
			scopes: ['profile', 'email']
		});
		console.log('result!!!', type, accessToken);
		if (type === 'success') {
			console.log(login);
			console.log('this props!!', this.props);
			await login(accessToken, 'google');
			console.log(token);
			await getUserInfo(token)
			// this.persistStorage(this.props.token);
			// console.log(AsyncStorage.getItem('x-auth'));
			navigation.goBack();

			// return accessToken;
		} else {
			throw new Error('Something is wrong with google auth!');
			// return {cancelled: true};
		}
	}

	// async persistStorage (token) {
	// 	try {
	// 		await AsyncStorage.setItem('x-auth', token);
	// 		console.log('token persisted');
	// 	} catch(e) {
	// 		console.log(e);
	// 	}
	// }

	componentDidMount() {
		AsyncStorage.getItem('x-auth').then((val) => {
			if (val) {
				this.setState({
					isLogged: true
				})
			}
			// console.log('didMount', val)
		});
		// console.log('didMount', AsyncStorage.getItem('x-auth'));
	}

	render() {
		const {closeModal, isModalVisible} = this.props;
			return (
			<View style={styles.container}>
				<Text>Configuraçõess do usuário</Text>
				<TouchableHighlight
					onPress={() => {
						// closeModal(!isModalVisible);
						this.props.navigation.goBack()
					}}>
					<Text>Hide Modal</Text>
				</TouchableHighlight>
				<TouchableOpacity>
					<TextInput
						style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        				onChangeText={(text) => this.setState({text})}
        				value={this.state.text}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.loginFacebook}>
					<Text>Login Facebook</Text>
				</TouchableOpacity>
				{
					this.props.isLogged || this.state.isLogged ?
						<Text>{ this.props.user.name }</Text>
					:
						<TouchableOpacity onPress={this.loginGoogle}>
							<Text>Login Google</Text>
						</TouchableOpacity>
				}
				<TouchableOpacity>
					<Text>Resetar jornada</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	container: {
		backgroundColor: '#ffffff'
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
  	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
  	}
};

// const mapStateToProps = () => {
// //   const { email, password, error, loading } = auth;
// //   return { email, password, error, loading };
// 	return {};
// };

// export default connect(mapStateToProps)(SocialLogin);
