import { Element } from "webdriverio";

abstract class BaseFragment {
  private rootElementFn: () => Promise<Element>;
  private name: string;
  protected element: Element;

  constructor(rootPage: () => Promise<Element>, name?: string) {
    this.rootElementFn = rootPage;
    this.name = name || BaseFragment.name;
  }

  private async initElem() {
    //await el.waitForExist({ timeout: 5000, timeoutMsg: `${this.name} fragment does not exist` });
    this.element = await this.rootElementFn();
  }

  get fragmentName() {
    return this.name;
  }

  private getElement(selector: string) {
    return async () => {
      await this.initElem();
      return await this.element.$(selector);
    };
  }

  protected initChild(childClass, selector: string, ...args) {
    return new childClass(this.getElement(selector), ...args);
  }
}

export { BaseFragment };
