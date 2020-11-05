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
		APP_URL: 'https://demo.realworld.io',
		API_URL: 'https://conduit.productionready.io/api/',
	},

	data: {
		CreateUserModel,
	},
};

export { provider };
