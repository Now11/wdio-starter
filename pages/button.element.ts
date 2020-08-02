import { BaseElement } from "./base.element";

class Button extends BaseElement {
  async click() {
    const elem = await this.element;

    await elem.waitForDisplayed({ timeout: 5000 });
    await elem.click();
  }
}
export { Button };
