import { AuthPage } from './pages';
import { browserInterface } from '../lib';
import { UserModel } from './data';

const provider = {
	pages: {
		authPage: () => new AuthPage(),
	},

	get browser() {
		return browserInterface;
	},
	builder: {
		UserModel,
	},
};

export { provider };
