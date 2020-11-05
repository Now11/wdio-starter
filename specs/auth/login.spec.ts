import { provider } from '../../src';
const { pages, browsr, env, data } = provider;

const authPage = pages.authPage();

describe('Authorization', function () {
	afterEach(async () => {
		await browsr.reloadSession();
	});
	//TO DO
	it('should login with valid credentials', async function () {});
});
