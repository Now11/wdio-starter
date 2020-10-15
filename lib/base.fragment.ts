import { Element, ElementArray } from 'webdriverio';

abstract class BaseFragment {
  private root: () => Promise<Element>;
  private name: string;
  protected element: Element;
  private isArr: boolean;

  constructor({ root, name, isArr }: { root: () => Promise<Element>; name: string; isArr?: boolean }) {
    this.root = root;
    this.name = name ? name : BaseFragment.name;
    this.isArr = isArr ? isArr : false;
  }

  private async initCurrentElement() {
    this.element = await this.root();
  }

  get fragmentName() {
    return this.name;
  }

  private getChildElement(selector: string, name: string, isArr: boolean) {
    this.isArr = isArr;
    return {
      root: async (): Promise<Element | ElementArray> => {
        await this.initCurrentElement();
        if (this.isArr) {
          return (await this.element.$$(selector)) as ElementArray;
        }
        return (await this.element.$(selector)) as Element;
      },
      name,
      isArr,
    };
  }

  protected initChild(childClass, selector: string, name: string, { isArr } = { isArr: false }, ...args) {
    return new childClass(this.getChildElement(selector, name, isArr), ...args);
  }
}

export { BaseFragment };
