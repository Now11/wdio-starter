import { AuthPage } from './pages';
import { browserInterface } from '../lib';
import { CreateUserModel } from './data/models';
import { request } from './helpers';
const provider = {
	pages: {
		authPage: () => new AuthPage(),
	},

	get browsr() {
		return browserInterface;
	},

	env: {
		APP_URL: process.env.APP_URL ? process.env.APP_URL : 'https://demo.realworld.io',
		API_URL: process.env.API_URL ? process.env.API_URL : 'https://conduit.productionready.io/api',
	},

	data: {
		CreateUserModel,
	},
};

export { provider };
