import { BaseElement } from "./base.element";
import { Element } from "webdriverio";

class Button extends BaseElement {
  constructor(root: () => Promise<Element>) {
    super(root);
  }
  async click() {
    const elem = await this.element;
    await elem.waitForDisplayed({ timeout: 5000 });
    await elem.click();
  }
}
export { Button };
