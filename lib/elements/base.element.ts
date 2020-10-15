import { Element } from 'webdriverio';
import { wait, step } from '../element_utils';

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
    await wait.elementForExist(this);
  }

  async waitForVisible() {
    await this.initCurrentElement();
    await wait.elementForVisible(this);
  }

  @step((name) => `${name} execute click`)
  async click() {
    await this.waitForVisible();
    await this.element.click();
  }

  @step((name) => `${name} execute sendKeys`)
  async sendKeys(keys: string) {
    await this.waitForVisible();
    await this.element.setValue(keys);
  }

  @step((name) => `${name} execute get text`)
  async getText() {
    await this.waitForVisible();
    return await this.element.getText();
  }
}

export { BaseElement };
