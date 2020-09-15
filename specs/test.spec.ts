import { provider } from "../framework";
import { expect } from "chai"

const { pages, _browser } = provider;

const loginUrl = "https://cloud.webscraper.io/login1"


const mainPage = provider.pages.main()
describe("describe 1", function () {
  beforeEach(async () => {
    await _browser.reloadSession();
  });

  it("test1", async function () {
    await _browser.url("https://webscraper.io/test-sites/tables");
    const textEl2 = await mainPage.table.cellText(2);
    expect(textEl2).be.eql("Potter", "Text cell doesn't match with expected value");
    await mainPage.header.clickLoginBtn();
    expect(await _browser.getCurrentUrl()).be.eql(loginUrl, "Url doesn't match");
  })

  it("test2", async function () {
    await _browser.url("https://webscraper.io/test-sites/tables");
    const textEl2 = await mainPage.table.cellText(3);
    expect(textEl2).be.eql("Potter", "Text cell doesn't match with expected value");
    await mainPage.header.clickLoginBtn();
    expect(await _browser.getCurrentUrl()).be.eql("https://cloud.webscraper.io/login", "Url doesn't match");
  });

});
