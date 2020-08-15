import { Element, ElementArray } from "webdriverio";
import { wait } from "./element_utils";
import { BaseFragment } from "./base.fragment";

abstract class BasePage {
  private root: string;
  private name: string;
  protected element: Element;
  constructor(root: string, name: string = BasePage.name) {
    this.root = root;
    this.name = name;
  }

  private async initElem() {
    const elem = await $(this.root);
    await elem.waitForExist({ timeout: 5000, timeoutMsg: `${this.name} does not exist` });
    this.element = elem;
  }

  protected getChildElement(selector: string) {
    return async (): Promise<Element> => {
      await this.initElem();
      return await this.element.$(selector);
    };
  }

  protected initChild(childClass, selector: string, name: string, ...args) {
    return new childClass(this.getChildElement(selector), name, ...args);
  }
}
export { BasePage };
