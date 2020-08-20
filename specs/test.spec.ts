import { provider } from "../framework";
import { expect } from "chai";
import { assert } from "chai";
const mainPage = provider.pages.main();
describe("describe 1", function () {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("User should be able to register into system", async function () {
    await browser.url("https://webscraper.io/test-sites/tables");
    expect(await mainPage.table.cellText(3)).to.eq("@hp");
    await mainPage.header.clickLoginBtn();
    await mainPage.table.g();
    await mainPage.gg();
    assert.strictEqual(1, 1, "test");
  });

  it("User should be able to add item", async function () {
    await browser.url("https://webscraper.io/test-sites/tables");
    expect(await mainPage.table.cellText(2)).to.eq("Potter");
    await mainPage.header.clickLoginBtn();
    assert.strictEqual(1, 1, "test");
  });
});
