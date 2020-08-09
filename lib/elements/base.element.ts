import { Element, ElementArray } from "webdriverio";
import { wait } from "../element_utils";

abstract class BaseElement {
  protected root: () => Promise<Element>;
  protected name: string;
  protected element: Element;

  constructor(rootFragment: () => Promise<Element>, name?: string) {
    this.root = rootFragment;
    this.name = name || BaseElement.name;
  }

  protected async initCurrentElement() {
    this.element = await this.root();
  }

  get elementName() {
    return this.name;
  }

  async waitForExist() {
    await this.initCurrentElement();
    await wait.forExist(this);
  }

  async waitForVisible() {
    await this.initCurrentElement();
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

  async getText() {
    await this.waitForVisible();
    return await this.element.getText();
  }
}

export { BaseElement };
