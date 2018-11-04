import React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import Splash from './pages/Splash';
import Intro from './pages/Intro';
import Animation1 from './pages/Animation1';
import Animation2 from './pages/Animation2';
import Animation3 from './pages/Animation3';
import NovoPorAqui from './pages/NovoPorAqui';
import Nome from './pages/Nome';
import Funcionalidades from './pages/Funcionalidades';
import Interesses from './pages/Interesses';
import Home from './pages/Home';
import Configuracoes from './pages/Configuracoes';
import SocialLogin from './pages/SocialLogin';
import Jornada from './pages/Jornada';
import Comunidade from './pages/Comunidade';
import Avatar from './pages/Avatar';

const StackIntro = createSwitchNavigator(
	{
		Animation1: {
			screen: Animation1
		},
		Animation2: {
			screen: Animation2
		},
		Animation3: {
			screen: Animation3
		},
		Intro: {
			screen: Intro
		},
		Funcionalidades: {
			screen: Funcionalidades
		},
		NovoPorAqui: {
			screen: NovoPorAqui
		},
		Nome: {
			screen: Nome
		},
		Interesses: {
			screen: Interesses
		}
	},
	{
		headerMode: 'none'
	}
);

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
	Intro: StackIntro,
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
