import { Element } from "webdriverio";
import { wait } from "../element_utils";

class BaseElement {
  protected root: () => Promise<Element>;
  private name: string;
  protected element: Element;

  constructor(root: () => Promise<Element>, name?: string) {
    this.root = root;
    this.name = name || BaseElement.name;
  }

  async initElem() {
    const el = await this.root();
    this.element = el;
  }

  get elementName() {
    return this.name;
  }

  async waitForExist() {
    if (!this.element) await this.initElem();
    wait.forExist(this);
  }

  async waitForVisible() {
    await this.waitForExist();
    await wait.forVisible(this);
  }

  async click() {
    await this.waitForVisible();
    await this.element.click();
  }

  async sendKeys(keys: string) {
    await this.waitForVisible();
    await this.element.setValue(keys);
  }
}

export { BaseElement };
