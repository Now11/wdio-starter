import { BaseElement } from "./base.element";
import { Element, ElementArray } from "webdriverio";

class ArrayElement {
  private root: () => Promise<ElementArray>;
  private name: string;
  private elements: ElementArray;
  constructor(root, name) {
    this.root = root;
    this.name = name;
  }

  protected async initElementList() {
    this.elements = await this.root();
    return this.elements;
  }

  get list() {
    return this.initElementList();
  }

  get elementName() {
    return this.name;
  }

  // async waitForExist() {
  //   await this.initCurrentElement();
  //   await wait.forExist(this);
  // }

  // async waitForVisible() {
  //   await this.initCurrentElement();
  //   await wait.forVisible(this);
  // }

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
