import { Element } from "webdriverio";
class BaseElement {
  protected root: () => Promise<Element>;

  get element(): Promise<Element> {
    return this.root();
  }

  constructor(root: () => Promise<Element>) {
    this.root = root;
    console.log(this);
  }
}

export { BaseElement };
