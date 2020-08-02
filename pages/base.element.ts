import { Element } from "webdriverio";
class BaseElement {
  protected root: () => Promise<Element>;
  constructor(root: () => Promise<Element>) {
    this.root = root;
  }
  get element(): Promise<Element> {
    return this.root();
  }
}

export { BaseElement };
