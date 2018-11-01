import React from 'react';
import { connect } from 'react-redux'; 
import { firstAccess } from '../actions/firstAccessAction';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

@connect(() => ({}), { firstAccess })
export default class Intro extends React.Component {	
	constructor(props) {
		super(props);
		this.state = {
			showRealApp: false
		}
	}
	_onDone = () => {
		const { firstAccess, navigation } = this.props;
		// User finished the introduction. Show real app through
		// navigation or simply by controlling state
		// this.setState({ showRealApp: true });
		// Actions.replace('tabbar');
		firstAccess();
		navigation.navigate('NovoPorAqui');
	}

	render() {
		return <AppIntroSlider slides={slides} onDone={this._onDone}/>;
	}
}

const styles = StyleSheet.create({
	image: {
		  width: 320,
		  height: 320,
	}
});
	
const slides = [
	{
		key: 'somethun',
		title: 'Title 1',
		text: 'Description.\nSay something cool',
		image: require('../../assets/any.jpeg'),
		imageStyle: styles.image,
		backgroundColor: '#59b2ab',
	},
	{
		key: 'somethun-dos',
		title: 'Title 2',
		text: 'Other cool stuff',
		image: require('../../assets/any.jpeg'),
		imageStyle: styles.image,
		backgroundColor: '#febe29',
	},
	{
		key: 'somethun1',
		title: 'Rocket guy',
		text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
		image: require('../../assets/any.jpeg'),
		imageStyle: styles.image,
		backgroundColor: '#22bcb5',
	}
];  
