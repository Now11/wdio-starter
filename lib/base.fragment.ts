import { Element, ElementArray } from "webdriverio";

abstract class BaseFragment {
  private root: () => Promise<Element>;
  private name: string;
  protected element: Element;
  private isChildArr: boolean;

  constructor({ root, name }: { root: () => Promise<Element>; name: string }, isChildArr?: boolean) {
    this.root = root;
    this.name = name ? name : BaseFragment.name;
    this.isChildArr = isChildArr ? isChildArr : false;
  }

  private async initCurrentElement() {
    this.element = await this.root();
  }

  protected get fragmentName() {
    return this.name;
  }

  private getChildElement(selector: string, isChildArr: boolean) {
    this.isChildArr = isChildArr;
    return async (): Promise<Element | ElementArray> => {
      await this.initCurrentElement();
      if (this.isChildArr) {
        return (await this.element.$$(selector)) as ElementArray;
      }
      return (await this.element.$(selector)) as Element;
    };
  }

  protected initChild(childClass, selector: string, name: string, { isChildArr } = { isChildArr: false }, ...args) {
    return new childClass({ root: this.getChildElement(selector, isChildArr), name }, ...args);
  }
}

export { BaseFragment };
