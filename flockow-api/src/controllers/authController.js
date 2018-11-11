import {User} from '../models/user';
// import { createToken } from '../utils/createToken';
import { facebookAuth } from '../utils/facebookAuth';
import { googleAuth } from '../utils/googleAuth';

export const loginWithAuth = async (req, res) => {
	console.log('====================================');
	console.log(req.body);
	console.log('====================================');
	const { provider, token } = req.body;
	let userInfo;

	try {
		if (provider === 'google') {
			userInfo = await googleAuth(token);
			console.log('userINfo', userInfo);
		} else {
			userInfo = await facebookAuth(token);
			console.log('facebook', userInfo);
		}
		await User.findOne({email: userInfo.email}, async function(err, user) {
			if (!err) {
				if (!user) {
					const user = new User(userInfo);
					await user.save();
					const xauthtoken = await user.generateAuthToken();
					return res.status(200).json({
						success: true,
						user: {
							id: user._id,
							name: user.displayName
						},
						token: xauthtoken,
					});
				}
				user.providerData = userInfo.providerData;
				await user.save();
				return res.status(200).json({
					success: true,
					user: {
						id: user._id,
						name: user.displayName
					},
					token: user.tokens[0].token,
				});
			} else {
				console.log(err);
			}
		});
	} catch (e) {
		return res.status(400).json({ error: true, errorMessage: e.message });
	}
};