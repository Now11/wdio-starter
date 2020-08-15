import { Element } from "webdriverio";
import { wait } from "../element_utils";
import { BaseFragment } from "../base.fragment";

abstract class BaseElement {
  private root: () => Promise<Element>;
  protected name: string;
  protected element: Element;

  constructor({ root, name }: { root: () => Promise<Element>; name: string }) {
    this.root = root;
    this.name = name ? name : BaseElement.name;
  }

  protected async initCurrentElement() {
    const element = await this.root();
    await element.waitForExist({ timeout: 5000, timeoutMsg: `${this.name} fragment does not exist` });
  }

  get elementName() {
    return this.name;
  }

  async waitForExist() {
    await this.initCurrentElement();
    await wait.elementForExist(this);
  }

  async waitForVisible() {
    await this.initCurrentElement();
    await wait.elementForVisible(this);
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
