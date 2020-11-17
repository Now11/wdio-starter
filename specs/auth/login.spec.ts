import { provider } from '../../src';
import { request, Response } from '../../src/helpers';
const { pages, browsr, env, data } = provider;

const authPage = pages.authPage();

describe('Authorization', function () {
	afterEach(async function () {
		await browsr.reloadSession();
	});

	it('should be able to login', async function () {
		const { email, password, ...rest } = new data.CreateUserModel();
		await request({
			url: env.API_URL,
			path: '/users',
			method: 'POST',
			body: {
				user: {
					email,
					password,
					...rest,
				},
			},
		});
		await browsr.url(`${env.APP_URL}/#/login`);
		await authPage.login({ email, password });
		await expect(browser).toHaveUrl(`${env.APP_URL}/#/`);
	});
});
