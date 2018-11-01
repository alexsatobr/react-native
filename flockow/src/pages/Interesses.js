import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { Constants, LinearGradient } from 'expo';

import { selectInterest } from '../actions';

const styles = {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1'
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
	}
}

@connect(() => ({}), { selectInterest })
export default class Interesses extends Component {
	constructor(prop) {
		super(prop);
		this.state = {
			selectedInterests: [],
			errorMessage: false 
		}

		this.handleSelectedInterests = this.handleSelectedInterests.bind(this);
		this.proceedToNextPage = this.proceedToNextPage.bind(this);
	}

	async proceedToNextPage() {
		const { selectInterest, navigation } = this.props;
		if (this.state.selectedInterests.length < 2) {
			return this.setState({ errorMessage: true })
		}
		await selectInterest({interests: this.state.selectedInterests});
		navigation.navigate('Home');
	}

	handleSelectedInterests(newInterest) {
		let interests = this.state.selectedInterests;
		if (interests.length > 1) {
			interests.slice(1);
		}
		interests.push(newInterest)
		this.setState({selectedInterests: interests})
	}

	render () {
		return (
			<View style={styles.container}>
				<LinearGradient
					colors={['#211f5d', '#4e3090']}
					style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
				/>
				<Text style={styles.text}>INTERESSES</Text>
				<LinearGradient colors={['#d14997','#5b398e']} start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelectedInterests('eu')}>
						<Text style={styles.buttonText}>Eu </Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient colors={['#d14997','#5b398e']} start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelectedInterests('diy')} >
						<Text style={styles.buttonText}>Faça você mesmo</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient colors={['#d14997','#5b398e']} start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelectedInterests('ambiente_fechado')}>
						<Text style={styles.buttonText}>Ambiente Fechado</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient colors={['#d14997','#5b398e']} start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelectedInterests('ar_livre')}>
						<Text style={styles.buttonText}>Ar Livre</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient colors={['#d14997','#5b398e']} start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelectedInterests('saude')}>
						<Text style={styles.buttonText}>Saúde</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient colors={['#d14997','#5b398e']} start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelectedInterests('eventos')}>
						<Text style={styles.buttonText}>Eventos</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient colors={['#d14997','#5b398e']} start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelectedInterests('atividade_fisica')}>
						<Text style={styles.buttonText}>Atividade Física</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient colors={['#d14997','#5b398e']} start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelectedInterests('caridade')}>
						<Text style={styles.buttonText}>Caridade</Text>
					</TouchableOpacity>
				</LinearGradient>
				<LinearGradient colors={['#d14997','#5b398e']} start={{x:0.0,y:1.0}} end={{x:1.0,y:1.0}} style={styles.buttonLogin}>
					<TouchableOpacity style={styles.buttonContainer} onPress={this.proceedToNextPage}>
						<Text style={styles.buttonText}>PROSSEGUIR</Text>
					</TouchableOpacity>
				</LinearGradient>
				
			</View>
		)
	}
}