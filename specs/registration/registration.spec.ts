import { provider } from '../../src/provider';
import { uuid } from '../../src/helpers';
import { env } from '../../src/env';

const { pages, builder } = provider;

const authPage = pages.authPage();

describe('Registration', function () {
	beforeEach(async () => {
		await browser.url('/sign-up');
	});

	afterEach(async () => {
		await browser.reloadSession();
	});

	it('should be able to register new doctor', async function () {
		const user = new builder.UserModel({
			name: `test${uuid()}`,
			surname: 'test',
			birthDate: '11/11/1990',
			gender: 'female',
			email: `test-${uuid()}@gmail.com`,
			password: 'Pa55word',
			phone: '380000000',
			status: 'doctor',
		});

		await authPage.register(user);
		await expect(browser).toHaveUrl(`${env.app.baseUrl}/doctors`);
	});
});
