import { ElementArray } from "webdriverio";
import { wait, step } from "../element_utils";

class ArrayElement {
  private root: () => Promise<ElementArray>;
  private name: string;
  private element: ElementArray;
  constructor({ root, name }: { root: () => Promise<ElementArray>; name: string }) {
    this.root = root;
    this.name = name;
  }

  protected async initElementList() {
    this.element = await this.root();
    await wait.forListToNotEmpty(this);
  }

  get list() {
    return this.initElementList();
  }

  get elementName() {
    return this.name;
  }

  async get(index: number) {
    await this.initElementList();
    return this.element[index];
  }

  @step(name => `${name} execute get element text`)
  async getText(index: number) {
    const el = await this.get(index)
    return await el.getText();
  }

  // async click() {
  //   await this.waitForVisible();
  //   await this.element.click();
  // }

  // async sendKeys(keys: string) {
  //   await this.waitForVisible();
  //   await this.element.setValue(keys);
  // }

  // async getText() {
  //   await this.waitForVisible();
  //   return await this.element.getText();
  // }
}
export { ArrayElement };
