import { Element } from "webdriverio";

class BaseFragmen {
  private rootElementFn: () => Promise<Element>;
  private name: string;

  constructor(rootPage: () => Promise<Element>, name?: string) {
    this.rootElementFn = rootPage;
    this.name = name || BaseFragmen.name;
  }

  private get root() {
    return this.rootElementFn();
  }

  private getElement(selector: string) {
    return async () => {
      const root = await this.root;
      return await root.$(selector);
    };
  }

  //TO DO: add waitForExist method

  protected initChild(childClass, selector: string, ...args) {
    return new childClass(this.getElement(selector), ...args);
  }
}

export { BaseFragmen };
