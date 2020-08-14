import { Element, ElementArray } from "webdriverio";

abstract class BaseFragment {
  private currentElementFn: () => Promise<any>;
  private name: string;
  protected element: any;
  private isArr: boolean;

  constructor(currentElementFn: () => Promise<any>, name: string = BaseFragment.name, isArr?) {
    this.currentElementFn = currentElementFn;
    this.name = name;
    this.isArr = isArr;
  }

  private async initCurrentElement(index?: number) {
    const el = await this.currentElementFn();
    //await el.waitForExist({ timeout: 5000, timeoutMsg: `${this.name} fragment does not exist` });
    this.element = el;
  }

  get fragmentName() {
    return this.name;
  }

  private getChildElement(selector: string, name: string, { isChildArr } = { isChildArr: false }) {
    return async () => {
      await this.initCurrentElement();
      if (isChildArr) {
        return (await this.element.$$(selector)) as Promise<ElementArray>;
      }

      return (await this.element.$(selector)) as Promise<Element>;
    };
  }

  protected initChild(childClass, selector: string, name: string, { isChildArr }, ...args) {
    return new childClass(this.getChildElement(selector, name, { isChildArr }), ...args);
  }
}

export { BaseFragment };
