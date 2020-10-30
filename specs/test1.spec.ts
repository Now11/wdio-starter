import { shared } from '../src';
import { expect } from 'chai';

const LOGIN_URL = 'https://cloud.webscraper.io/login';
const URL = 'https://webscraper.io/test-sites/tables';

const { pages, _browser } = shared;
const mainPage = pages.main();

describe('suite 2', function () {
	afterEach(async () => {
		await _browser.reloadSession();
	});

	//should fail
	it('failed test', async function () {
		await _browser.url(URL);
		const textEl2 = await mainPage.cellText(3);
		expect(textEl2).be.eql('test', "Text cell doesn't match with expected value");
		await mainPage.header.clickLoginBtn();
		expect(await _browser.getCurrentUrl()).be.eql(LOGIN_URL, "Url doesn't match");
	});
});
