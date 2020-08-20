import { ElementArray } from "webdriverio";
import { wait } from "../element_utils";

class ArrayElement {
  private root: () => Promise<ElementArray>;
  private name: string;
  private element: ElementArray;
  constructor({ root, name }: { root: () => Promise<ElementArray>; name: string }) {
    this.root = root;
    this.name = name ? name : ArrayElement.name;
  }

  private async initElementList() {
    this.element = await this.root();
    await wait.list.toNotEmpty(this);
  }

  async list() {
    await this.initElementList();
    return this.element;
  }

  get elementName() {
    return this.name;
  }

  async get(index: number) {
    await this.initElementList();
    return this.element[index];
  }

  async waitForVisible(index: number) {
    await this.initElementList();
    await wait.list.elementToBeVisible(this, index);
  }

  async click(index: number) {
    await this.waitForVisible(index);
    await this.element[index].click();
  }

  async clickByText(text: string) {
    await this.initElementList();
    this.element.map(async (el, i, elems) => {
      if ((await el.getText()).toLowerCase() == text.toLowerCase()) {
        return await elems[i].click();
      }
    });
  }

  async sendKeys(keys: string, { index }: { index: number }) {
    await this.waitForVisible(index);
    await this.element[index].setValue(keys);
  }

  async getText(index: number) {
    await this.waitForVisible(index);
    return await this.element[index].getText();
  }
}

export { ArrayElement };
