import { provider } from "../framework";

const mainPage = provider.main();

describe("test", function () {
  it("test1", async function () {
    await browser.url("https://about.gitlab.com");
    await mainPage.header.signUp.click();
  });
});
