import { Element } from "webdriverio";
import { wait } from "./element_utils";

abstract class BasePage {
  private root: string;
  private name: string;
  protected element: Element;
  constructor(root: string, name: string) {
    this.root = root;
    this.name = name ? name : BasePage.name;
  }

  private async initCurrentElement() {
    this.element = await $(this.root);
    // await element.waitForExist({ timeout: 5000, timeoutMsg: `${this.name} does not exist` });
  }

  async waitForExist() {
    await this.initCurrentElement();
    await wait.elementForExist(this);
  }

  protected getChildElement(selector: string, name: string) {
    return {
      root: async (): Promise<Element> => {
        await this.initCurrentElement();
        return await this.element.$(selector);
      },
      name,
    };
  }

  protected initChild(childClass, selector: string, name: string, ...args) {
    return new childClass(this.getChildElement(selector, name), ...args);
  }
}
export { BasePage };
