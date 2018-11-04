import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Constants, LinearGradient, Font, AppLoading } from 'expo';
import SelectMultiple from 'react-native-select-multiple';
import Icon from 'react-native-vector-icons/FontAwesome';

// import Icon from 'react-native-vector-icons/FontAwesome';

const func = ['Aceitar notificações', 'Conexão Bluetooth', 'Sincronização \nde apps externos']

const styles = {
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1',
		padding: 8,
		zIndex: 1
	},
	select: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	titulo: {
		fontFamily: 'Jalisco',
		fontSize: 70,
		color: 'white',
		marginTop: 50,
		textAlign: 'center',
		marginBottom: 20,
		lineHeight: 55,
		paddingTop: 20,
	},
	buttonLogin: {
		height: 48,
		width: 240,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
		marginTop: 10,
	},
	icon: {
		backgroundColor: 'transparent',
		color: '#fff',
		fontSize: 18,
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20,
	},
	alignView: {
		alignItems: 'center',
		marginBottom: 40
	},
	row: {
		backgroundColor: 'transparent',
		borderBottomWidth: 0,
		paddingBottom: 5,
		justifyContent: 'center'
	},
	label: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 22,
		paddingLeft: 8,
		width: 230
	},
	checkbox: {
		width: 30,
		height: 30,
		borderColor: '#655ba7',
		borderRadius: 15,
		borderWidth: 3,
		overflow: 'hidden'
	},
	selectedCheckbox: {
		padding: 5
	}
};

export default class Funcionalidades extends Component {
	constructor(prop) {
		super(prop);
		this.state = {
			selectedFunc: [],
			fontLoaded: false
		};
		
		this.handlePress = this.handlePress.bind(this)
	}
	async startAsync() {
		await Font.loadAsync({
			'Jalisco': require('../../assets/fonts/Jalisco.ttf'),
		});

		this.setState({ fontLoaded: true });
	}

	onSelectionsChange = (selectedFunc) => {
		this.setState({ selectedFunc })
	}

	handlePress() {
		this.props.navigation.navigate('Nome');
	}

	render() {
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
			<View style={styles.container}>
				<LinearGradient
					colors={['#211f5d', '#4e3090']}
					style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
				/>
				<Text style={styles.titulo}>Funcionalidades {"\n"}do app</Text>
				<SelectMultiple
					contentContainerStyle={styles.select}
					items={func}
					selectedItems={this.state.selectedFunc}
					onSelectionsChange={this.onSelectionsChange}
					rowStyle={styles.row}
					labelStyle={styles.label}
					checkboxStyle={styles.checkbox}
					selectedCheckboxStyle={styles.selectedCheckbox}
					selectedCheckboxSource={require('../../assets/img/check2.png')}
					checkboxSource={require('../../assets/img/checkfill.png')}
				/>
				<View style={styles.alignView}>
					<LinearGradient
						colors={['#d14997', '#5b398e']}
						start={{x:0.0, y:1.0 }} end={{x:1.0, y:1.0}}
						style={styles.buttonLogin}>
						<TouchableOpacity onPress={this.handlePress}>
							<View>
								<Icon style={styles.icon}>
									<Text style={styles.buttonText}>EU ACEITO  </Text>
									<Icon name="arrow-right" style={{ fontSize: 20 }} />
								</Icon>
							</View>
						</TouchableOpacity>
					</LinearGradient>
				</View>
			</View>
		);
	}
}

