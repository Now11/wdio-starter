import { Element } from "webdriverio";
import { wait } from "./element_utils";
abstract class BasePage {
  private root: string;
  private name: string;
  protected element: Element;
  constructor(root: string, name?: string) {
    this.root = root;
    this.name = name || BasePage.name;
  }

  private async initElem() {
    //await el.waitForExist({ timeout: 5000, timeoutMsg: `${this.name} does not exist` });
    this.element = await $(this.root);
  }

  // async click() {
  //   if (!this.element) await this.initElem();
  //   await wait.forVisible(this);
  //   await this.element.click();
  // }

  protected getChildElement(selector: string) {
    return async () => {
      await this.initElem();
      return await this.element.$(selector);
    };
  }
  protected initChild(childClass, selector: string, ...args) {
    return new childClass(this.getChildElement(selector), ...args);
  }
}
export { BasePage };
