import { BaseElement } from "./base.element";

class ButtonElement extends BaseElement {
  constructor({ root, name }) {
    super({ root, name });
  }

  async sendKeys() {
    throw new Error(`${this.elementName} does not have sendKeys`);
  }
}
export { ButtonElement };
