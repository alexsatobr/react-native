import jwt from 'jsonwebtoken';

// import config from '../config/config';
const access = 'auth';
export const createToken = args =>
	jwt.sign({ id: args._id.toHexString(), access }, process.env.JWT_SECRET).toString();