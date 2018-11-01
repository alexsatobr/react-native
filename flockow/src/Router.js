import React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import Splash from './pages/Splash';
import Intro from './pages/Intro';
import NovoPorAqui from './pages/NovoPorAqui';
import Interesses from './pages/Interesses';
import Home from './pages/Home';
import Configuracoes from './pages/Configuracoes';
import SocialLogin from './pages/SocialLogin';
import Jornada from './pages/Jornada';
import Comunidade from './pages/Comunidade';
import Avatar from './pages/Avatar';

const StackConfig = createStackNavigator(
	{
		Config: {
			screen: Configuracoes
		},
		SocialLogin: {
			screen: SocialLogin
		}
	},
	{
		mode: 'modal',
		headerMode: 'none'
	}
)


const StackHome = createStackNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: {
				headerLeft: null,
				headerTitle: "Home"
			}
		}
	}
);

const StackJornada = createStackNavigator({
	Jornada: {
		screen: Jornada,
		navigationOptions: {
			headerLeft: null,
        	headerTitle: "Jornada"
		}
	}
});

const StackComunidade = createStackNavigator({
	Comunidade: {
		screen: Comunidade,
		navigationOptions: {
			headerLeft: null,
        	headerTitle: "Comunidade"
		}
	}
});

const StackAvatar = createStackNavigator({
	Avatar: {
		screen: Avatar,
		navigationOptions: {
			headerLeft: null,
        	headerTitle: "Avatar"
		}
	}
});


const mainStack = createBottomTabNavigator(
	{
		Home: StackHome,
		Jornada: StackJornada,
		Comunidade: StackComunidade,
		Avatar: StackAvatar
	},
	{
		initialRouteName: "Home"
	}
);

const StackHomeFist = createStackNavigator(
	{
		mainStack: {
			screen: mainStack
		},
		Config: {
			screen: StackConfig
		},
	},
	{
		mode: 'modal',
		headerMode: 'none'
	}
);

const SwitchNavigator = createSwitchNavigator({
	Splash: { screen: Splash },
	Intro: { screen: Intro },
	NovoPorAqui: { screen: NovoPorAqui },
	Interesses: { screen: Interesses },
	Home: StackHomeFist
});


class RouterComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SwitchNavigator/>
		)
	}
}

export default RouterComponent;
