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
    const el = await this.currentElementFn();
    await el.waitForExist({ timeout: 5000, timeoutMsg: `${this.name} fragment does not exist` });
    this.element = el;
  }

  get fragmentName() {
    return this.name;
  }

  private getChildElement(selector: string, name: string, elemArr: boolean) {
    return async () => {
      await this.initCurrentElement();
      if (elemArr) {
        return await this.element.$$(selector);
      }
      return await this.element.$(selector);
    };
  }

  protected initChild(childClass, selector: string, name: string, { elemArr } = { elemArr: false }, ...args) {
    return new childClass(this.getChildElement(selector, name, elemArr), ...args);
  }
}

export { BaseFragment };
