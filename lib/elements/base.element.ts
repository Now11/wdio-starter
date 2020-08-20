import { Element } from "webdriverio";
import { wait } from "../element_utils";

abstract class BaseElement {
  private root: () => Promise<Element>;
  protected name: string;
  protected element: Element;

  constructor({ root, name }: { root: () => Promise<Element>; name?: string }) {
    this.root = root;
    this.name = name ? name : BaseElement.name;
  }

  protected async initCurrentElement() {
    this.element = await this.root();
  }

  get elementName() {
    return this.name;
  }

  async waitForExist() {
    await this.initCurrentElement();
    await wait.element.toExist(this);
  }

  async waitForVisible() {
    await this.initCurrentElement();
    await wait.element.toBeVisible(this);
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
