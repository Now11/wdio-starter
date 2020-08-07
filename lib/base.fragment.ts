import { Element } from "webdriverio";

abstract class BaseFragment {
  private currentElementFn: () => Promise<Element>;
  private name: string;
  private element: Element;

  constructor(currentElementFn: () => Promise<Element>, name?: string) {
    this.currentElementFn = currentElementFn;
    this.name = name || BaseFragment.name;
  }

  private async initCurrentElement() {
    //await el.waitForExist({ timeout: 5000, timeoutMsg: `${this.name} fragment does not exist` });
    this.element = await this.currentElementFn();
  }

  get fragmentName() {
    return this.name;
  }

  private getChildElement(selector: string) {
    return async () => {
      await this.initCurrentElement();
      return await this.element.$(selector);
    };
  }

  protected initChild(childClass, selector: string, ...args) {
    return new childClass(this.getChildElement(selector), ...args);
  }
}

export { BaseFragment };
