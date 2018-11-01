import axios from 'axios';
import { Platform } from 'react-native';

let url;

// Cause of genymotion we need to change the url here
// http://stackoverflow.com/questions/5528850/how-to-connect-localhost-in-android-emulator
if (Platform.OS !== 'ios') {
  url = 'http://10.0.2.2:3000/';
} else {
  url = 'http://localhost:3000';
}

axios.defaults.baseURL = url;


class UserApi {
	constructor() {
		this.path = '/users';
	}

	async login (args) {
		try {
			const {data} = await axios.post(`${this.path}/socialauth`, args);
			return data;
		} catch (e) {
			throw (e);
		}
	}
}

export const User = new UserApi();