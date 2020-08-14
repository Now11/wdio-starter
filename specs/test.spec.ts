import { provider } from "../framework";
import { expect } from "chai";
const mainPage = provider.pages.main();

describe("describe 1", function () {
  beforeEach(async () => {
    await browser.reloadSession();
  });

  it("test1", async function () {
    await browser.url("https://webscraper.io/test-sites/tables");
    await mainPage.table.cellText();
  });

  xit("test2", async function () {
    await browser.url("https://webscraper.io/test-sites/tables");
    //const text = await mainPage.getTableCellText();
  });
});
