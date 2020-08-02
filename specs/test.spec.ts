import { MainPage } from "../pages/main.page";

const mainPage = new MainPage("body");
describe("test", function () {
  it("test1", async function () {
    await browser.url("https://about.gitlab.com");
    await mainPage.header.toSignUp();
    await browser.pause(5000);
  });
});
