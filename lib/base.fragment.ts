import { Element, ElementArray } from "webdriverio";

abstract class BaseFragment {
  private root: () => Promise<Element>;
  private name: string;
  protected element: Element;
  private isChildArr: boolean;

  constructor({ root, name, isChildArr }: { root: () => Promise<Element>; name: string; isChildArr: boolean }) {
    this.root = root;
    this.name = name ? name : BaseFragment.name;
    this.isChildArr = isChildArr ? isChildArr : false;
  }

  private async initCurrentElement() {
    this.element = await this.root();
  }

  get fragmentName() {
    return this.name;
  }

  private getChildElement(selector: string, name: string, isChildArr: boolean) {
    this.isChildArr = isChildArr;
    return {
      root: async (): Promise<Element | ElementArray> => {
        await this.initCurrentElement();
        if (this.isChildArr) {
          return (await this.element.$$(selector)) as ElementArray;
        }
        return (await this.element.$(selector)) as Element;
      },
      name,
      isChildArr,
    };
  }

  protected initChild(childClass, selector: string, name: string, { isChildArr } = { isChildArr: false }, ...args) {
    return new childClass(this.getChildElement(selector, name, isChildArr), ...args);
  }
}

export { BaseFragment };
