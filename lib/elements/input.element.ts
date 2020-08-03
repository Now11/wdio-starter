import { BaseElement } from "./base.element";

class InputElement extends BaseElement {
  constructor(root, name) {
    super(root, name);
  }

  async get() {
    await this.waitForExist();
    return await this.element.getAttribute("value");
  }
}
export { InputElement };
