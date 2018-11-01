import React, { Component } from 'react';
import { Text, TouchableHighlight, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { logout} from '../actions/authActions';

@connect(state => ({
	auth: state.auth.info,
	isLogged: state.auth.isLogged,
	user: state.user
}), { logout })
export default class Configuracoes extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalVisible: false,
		};
		this.logout = this.logout.bind(this);
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	async logout () {
		await AsyncStorage.removeItem('x-auth');
		await AsyncStorage.removeItem('firstAccess');
		await AsyncStorage.getItem('x-auth').then(val => console.log(val));
		await this.props.logout();
		console.log('logged out');
	}

	render() {
		const {closeModal, isModalVisible} = this.props;
			return (
			<View style={styles.container}>
				<Text>Configuraçõess do usuário</Text>
				<TouchableHighlight
					onPress={() => {
						this.props.navigation.navigate('Home')
					}}>
					<Text>Hide Modal</Text>
				</TouchableHighlight>
				<TouchableOpacity>
					<Text>Editar o nome</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.logout}>
					<Text> Deslogar </Text>
				</TouchableOpacity>
				{
					this.props.isLogged || this.state.isLogged ?
						<Text>
							Logado { this.props.auth.name || this.props.user.name || 'fulano' }
						</Text>
					:
						<TouchableOpacity onPress={() => {
							// this.setModalVisible(true)
							this.props.navigation.navigate('SocialLogin');
							}}>
							<Text>Login</Text>
						</TouchableOpacity>
				}
				<TouchableOpacity>
					<Text>Ativar notificações</Text>
				</TouchableOpacity>
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