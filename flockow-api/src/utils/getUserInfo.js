export function getUserInfo(data, provider) {
	let fullName;
	let avatar;
	let displayName = data.given_name || data.name || data.email;

	if (provider === 'google') {
		fullName = `${data.given_name||data.name} ${data.family_name}`.replace('undefined', '');
		avatar = data.picture;
	} else {
		fullName = data.name;
		avatar = data.picture.data.url;
	}
  
	return {
		displayName,
		fullName,
		avatar,
		email: data.email,
		password: data.id,
		providerData: {
			uid: data.id,
			provider,
		},
	};
}