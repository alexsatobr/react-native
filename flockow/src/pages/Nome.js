import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, TextInput, TouchableOpacity, Animated, Dimensions, Keyboard, UIManager } from 'react-native';
import { Constants, LinearGradient, Font, AppLoading } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firstAccessName } from '../actions/firstAccessNameAction';

const { State: TextInputState } = TextInput;

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
	},
	titulo: {
		fontFamily: 'Jalisco',
		fontSize: 78,
		color: 'white',
		marginTop: -20,
		textAlign: 'center',
		lineHeight: 55,
		paddingTop: 20,
	},
	image: {
		width: 205,
		height: 220,
		marginTop: 20,
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		marginTop: 40,
		fontSize: 22,
	},
	textError: {
		color: 'white',
		fontWeight: 'bold',
		marginTop: 10,
		fontSize: 22,
	},
	input: {
		height: 40,
		width: 280,
		borderColor: 'white',
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 1,
		color: 'white',
		fontSize: 20,
	},
	icon: {
		backgroundColor: 'transparent',
		color: '#fff',
		marginTop: 22,
		fontSize: 20,
		fontWeight: 'bold',
		borderColor: 'white',
		borderWidth: 2,
		width: 150,
		paddingTop: 15,
		paddingBottom: 15,
		textAlign: 'center',
		borderRadius: 28,
	},
};
@connect(() => ({}), { firstAccessName })
export default class Nome extends Component {
	constructor(prop) {
		super(prop);
		this.state = {
			shift: new Animated.Value(0),
			fontLoaded: false,
			text: '',
			textError: ''
		};

		this.saveName = this.saveName.bind(this)
	}

	componentWillMount() {
		this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
		this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
	}

	componentWillUnmount() {
		this.keyboardDidShowSub.remove();
		this.keyboardDidHideSub.remove();
	}

	async startAsync() {
		await Font.loadAsync({
			'Jalisco': require('../../assets/fonts/Jalisco.ttf'),
		});

		this.setState({ fontLoaded: true });
	}
	
	handleKeyboardDidShow = (event) => {
		const { height: windowHeight } = Dimensions.get('window');
		const keyboardHeight = event.endCoordinates.height;
		const currentlyFocusedField = TextInputState.currentlyFocusedField();
		UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
			const fieldHeight = height;
			const fieldTop = pageY;
			const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
			if (gap >= 0) {
				return;
			}
			Animated.timing(
				this.state.shift,
				{
					toValue: gap,
					duration: 1000,
					useNativeDriver: true,
				}
			).start();
		});
	}

	handleKeyboardDidHide = () => {
		Animated.timing(
			this.state.shift,
			{
				toValue: 0,
				duration: 1000,
				useNativeDriver: true,
			}
		).start();
	}

	saveName() {
		const { text } = this.state;
		const { firstAccessName, navigation } = this.props;
		console.log(text.length);
		if (text.length < 1) {
			return this.setState({textError: 'Digite o seu nome ;)'})
		}
		this.setState({textError: ''})
		firstAccessName({name: text});
		return navigation.navigate('Home');
 	}

	render() {
		const { shift, text, textError } = this.state;
		if (!this.state.fontLoaded) {
			return (
				<AppLoading
					startAsync={this.startAsync}
					onFinish={() => this.setState({ fontLoaded: true })}
					onError={console.warn}
				/>
			);
		}
		return (
			<Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
				<LinearGradient
					colors={['#211f5d', '#4e3090']}
					style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
				/>
				<Text style={styles.titulo}>
					Bem-vindo
				</Text>
				<Image style={styles.image} source={require('../../assets/img/img3.png')} />
				<Text style={styles.text}>Como prefere ser chamado?</Text>
				<TextInput
					style={styles.input}
					underlineColorAndroid="rgba(0,0,0,0)"
					autoCorrect={false}
					onChangeText={(text) => this.setState({text})}
					value={text}
				/>
				<Text style={styles.textError}>{textError}</Text>
				<TouchableOpacity onPress={ this.saveName }>
					<View>
						<Icon style={styles.icon}>
							<Text style={styles.textbutton}>OK  </Text>
							<Icon name="arrow-right" style={{ fontSize: 20 }} />
						</Icon>
					</View>
				</TouchableOpacity>
			</Animated.View>
		);
	}
}

