import { AuthPage } from './pages';
import { browserInterface } from '../lib';
import { CreateUserModel } from './data/models';

const provider = {
	pages: {
		authPage: () => new AuthPage(),
	},

	get browsr() {
		return browserInterface;
	},

	env: {
		APP_URL: 'https://demo.realworld.io', // process.env.BASE_HOST,
		API_URL: 'https://conduit.productionready.io/api/', // process.env.BASE_HOST_API
	},

	data: {
		CreateUserModel,
	},
};

export { provider };
