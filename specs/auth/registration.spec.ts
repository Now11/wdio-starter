import { provider } from '../../src';
const { pages, browsr, env, data } = provider;

const authPage = pages.authPage();

describe('Registration', function () {
	beforeEach(async () => {
		await browsr.url(`${env.APP_URL}/#/register`);
	});

	afterEach(async function () {
		await browsr.reloadSession();
	});

	it('should be able to register new user', async function () {
		const user = new data.CreateUserModel();

		await authPage.register(user);
		await expect(browser).toHaveUrl(`${env.APP_URL}/#/`);
	});
});
