import { shared } from '../src';
import { expect } from 'chai';

const { pages, _browser } = shared;

const loginUrl = 'https://cloud.webscraper.io/login';

const mainPage = pages.main();

describe('describe 1', function () {
  afterEach(async () => {
    await _browser.reloadSession();
  });

  //should pass
  it('test 1', async function () {
    await _browser.url('https://webscraper.io/test-sites/tables');
    const textEl2 = await mainPage.table.cellText(2);
    expect(textEl2).be.eql('Potter', "Text cell doesn't match with expected value");
    await mainPage.header.clickLoginBtn();
    expect(await _browser.getCurrentUrl()).be.eql(loginUrl, "Url doesn't match");
  });

  //should fail 
  it('test 2', async function () {
    await _browser.url('https://webscraper.io/test-sites/tables');
    const textEl2 = await mainPage.cellText(3);
    expect(textEl2).be.eql('test', "Text cell doesn't match with expected value");
    await mainPage.header.clickLoginBtn();
    expect(await _browser.getCurrentUrl()).be.eql('https://cloud.webscraper.io/login', "Url doesn't match");
  });
});
