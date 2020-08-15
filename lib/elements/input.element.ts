import { BaseElement } from "./base.element";

class InputElement extends BaseElement {
  constructor({ root, name }) {
    super({ root, name });
  }

  async getText() {
    await this.waitForExist();
    return await this.element.getAttribute("value");
  }
}
export { InputElement };
