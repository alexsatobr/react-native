import React from 'react';
import { connect } from 'react-redux';
import { Constants, LinearGradient, Font, AppLoading } from 'expo';
import { firstAccess } from '../actions/firstAccessAction';
import { Text, View, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const { width } = Dimensions.get('window')

const slides = [
	{
		key: 'slide1',
		tema: 'O que ele faz ?',
		title: '#DESAFIADOR',
		text: 'PARA QUE VOCÊ POSSA SE ORGANIZAR E\n ATINGIR OS SEUS PRINCIPAIS OBJETIVOS',
		image: require('../../assets/json/byke.json'),
		colors: ['#211f5d', '#4e3090'],
	},
	{
		key: 'slide2',
		tema: 'Por que ?',
		title: '#CONEXÃO',
		text: 'NÓS ACREDITAMOS QUE PRECISAMOS DE CONEXÕES MAIS REAIS',
		image: require('../../assets/json/maos.json'),
		colors: ['#211f5d', '#4e3090'],
	},
	{
		key: 'slide3',
		tema: 'Como ?',
		title: '#TECNOLOGIA',
		text: 'E A TECNOLOGIA PODE SER UMA ÓTIMA FERRAMENTA PARA INCENTIVAR ISSO',
		image: require('../../assets/json/foguete.json'),
		colors: ['#211f5d', '#4e3090'],
	},
];

const styles = {
	mainContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		paddingTop: Constants.statusBarHeight,
	},
	image: {
		width: width,
		marginTop: -20,
	},
	text: {
		color: 'rgba(255, 255, 255, 0.8)',
		backgroundColor: 'transparent',
		textAlign: 'center',
		paddingHorizontal: 20,
		fontWeight: 'bold',
	},
	title: {
		fontSize: 24,
		color: '#ed244e',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
		textAlign: 'center',
		marginBottom: 16,

	},
	titulo: {
		fontFamily: 'Jalisco',
		fontSize: 78,
		color: 'white',
		marginTop: 50,
	},
	descricao: {
		marginTop: -120,
	}
};


@connect(() => ({}), { firstAccess })
export default class Intro extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false
		}
	}

	async startAsync() {
		await Font.loadAsync({
			'Jalisco': require('../../assets/fonts/Jalisco.ttf'),
		});

		this.setState({ fontLoaded: true });
	}

	renderItem = props => (
		<LinearGradient
			style={[styles.mainContent, {
				paddingTop: props.topSpacer,
				paddingBottom: props.bottomSpacer,
				width: props.width,
				height: props.height,
			}]}
			colors={props.colors}
			start={{ x: 0, y: .1 }} end={{ x: .1, y: 1 }}
		>
			<Text style={styles.titulo}>{props.tema}</Text>
			<LottieView
				autoPlay
				loop
				style={styles.image}
				source={props.image}
				resizeMode="cover"
			/>
			<View style={styles.descricao}>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.text}>{props.text}</Text>
			</View>
		</LinearGradient>
	);

	_onDone = () => {
		const { firstAccess, navigation } = this.props;
		firstAccess();
		navigation.navigate('NovoPorAqui');
	}

	render() {
		if (!this.state.isReady) {
			return (
				<AppLoading
					startAsync={this.startAsync}
					onFinish={() => this.setState({ isReady: true })}
					onError={console.warn}
				/>
			);
		}
		return <AppIntroSlider nextLabel='Próximo' slides={slides} showPrevButton prevLabel='Voltar' doneLabel='Concluído' renderItem={this.renderItem} activeDotStyle={{ backgroundColor: "#ed244e" }} onDone={this._onDone} />;
	}
}
