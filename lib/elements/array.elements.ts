import { ElementArray } from 'webdriverio';
import { wait} from '../element_utils';
import {step} from "../report"

class ArrayElement {
  private root: () => Promise<ElementArray>;
  private name: string;
  private element: ElementArray;
  constructor({ root, name }: { root: () => Promise<ElementArray>; name: string }) {
    this.root = root;
    this.name = name ? name : ArrayElement.name;
  }

  get elementName() {
    return this.name;
  }

  protected async initElementList() {
    this.element = await this.root();
    await wait.forListToNotEmpty(this);
  }

  private async waitForVisible(index: number) {
    await this.initElementList();
    await wait.listElementForVisible({ ctx: this, index });
  }

  private async waitForExist(index) {
    await this.initElementList();
    await wait.listElementToExist({ ctx: this, index });
  }

  @step((name) => `${name} execute get element text`)
  async getText(index: number) {
    await this.waitForExist(index);
    return await this.element[index].getText();
  }

  @step((name) => `${name} execute click`)
  async click(index: number) {
    await this.waitForVisible(index);
    await this.element[index].click();
  }

  @step((name) => `${name} execute sendKeys`)
  async sendKeys({ index, keys }: { index: number; keys: string }) {
    await this.waitForVisible(index);
    await this.element[index].setValue(keys);
  }
}

export { ArrayElement };
