import { shared } from '../src';
import { expect } from 'chai';

const { pages } = shared;

const loginUrl = 'https://cloud.webscraper.io/login';

const mainPage = pages.main();

describe('describe 1', function () {
	afterEach(async () => {
		await browser.reloadSession();
	});

	//should pass
	it('test 1', async function () {
		await browser.url('https://webscraper.io/test-sites/tables');
		const textEl2 = await mainPage.table.cellText(2);
		expect(textEl2).be.eql('Potter', "Text cell doesn't match with expected value");
		await mainPage.header.clickLoginBtn();
		expect(await browser.getUrl()).be.eql(loginUrl, "Url doesn't match");
	});

	//should fail
	it('test 2', async function () {
		await browser.url('https://webscraper.io/test-sites/tables');
		const textEl2 = await mainPage.cellText(3);
		expect(textEl2).be.eql('test', "Text cell doesn't match with expected value");
		await mainPage.header.clickLoginBtn();
		expect(await browser.getUrl()).be.eql('https://cloud.webscraper.io/login', "Url doesn't match");
	});

	// it('test 2', async function () {
	// 	await browser.url('https://www.dofactory.com');
	// 	const loginBtn = await $('[href="/login"]');
	// 	await loginBtn.click();
	// 	expect(await browser.getUrl()).be.eql('https://www.dofactory.com/login');
	// });

	// it('test 2', async function () {
	// 	await browser.url('https://www.dofactory.com');
	// 	const loginBtn = await $('[href="/login"]');
	// 	await loginBtn.click();
	// 	expect(await browser.getUrl()).be.eql('https://www.dofactory.com/login');
	// 	const emailField = await $('#Email');
	// 	const password = await $('#Password');
	// 	await emailField.setValue('test@test.com');
	// 	await password.setValue('admin');
	// 	expect('').be.eql('123');
	// });
});
