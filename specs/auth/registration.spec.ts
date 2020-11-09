import { provider } from '../../src';
const { pages, browsr, env, data } = provider;

const authPage = pages.authPage();

describe('Registration', function () {
	afterEach(async () => {
		await browsr.reloadSession();
	});

	it('should be able to register new user', async function () {
		const user = new data.CreateUserModel();

		await browsr.url(`${env.APP_URL}/#/register`);
		await authPage.register({ ...user });
		await expect(browser).toHaveUrl(`${env.APP_URL}/#/1`);
	});
});
