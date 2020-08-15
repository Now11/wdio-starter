import { Element, ElementArray } from "webdriverio";

abstract class BaseFragment {
  private root: () => Promise<Element>;
  private name: string;
  protected element: Element;
  private isChildArr: boolean;

  constructor(currentElementFn: () => Promise<Element>, name: string = BaseFragment.name, isChildArr = false) {
    this.root = currentElementFn;
    this.name = name;
    this.isChildArr = isChildArr;
  }

  private async initCurrentElement() {
    const el = await this.root();
    await el.waitForExist({ timeout: 5000, timeoutMsg: `${this.name} fragment does not exist` });
    this.element = el;
  }

  get fragmentName() {
    return this.name;
  }

  private getChildElement(selector: string) {
    return async (): Promise<Element | ElementArray> => {
      await this.initCurrentElement();
      if (this.isChildArr) {
        return ((await this.element.$$(selector)) as unknown) as Promise<ElementArray>;
      }
      return ((await this.element.$(selector)) as unknown) as Promise<Element>;
    };
  }

  protected initChild(childClass, selector: string, name: string, { isChildArr } = { isChildArr: false }, ...args) {
    this.isChildArr = isChildArr;
    return new childClass(this.getChildElement(selector), name, { isChildArr }, ...args);
  }
}

export { BaseFragment };
