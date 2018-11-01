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

	async info (token) {
		try {
			const {data} = await axios.get(`${this.path}/details`, { headers: { 'x-auth': token } })
				console.log('getInfo', data);
				return data;
		} catch (e) {
			throw (e);
		}
	}
}

export const getUser = new UserApi();