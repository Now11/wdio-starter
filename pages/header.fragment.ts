import { Button } from "./button.element";
import { Element } from "webdriverio";
class Fragment1 {
  protected get root1() {
    return this.rootElement();
  }

  protected signUpBtn: Button = new Button(async () => {
    const root = await this.root1;
    return await root.$("ul div.sign-up-container li:nth-child(2)");
  });

  private rootElement: () => Promise<Element>;
  constructor(rootElement: () => Promise<Element>) {
    this.rootElement = rootElement;
    console.log(this);
  }

  async toSignUp() {
    await this.signUpBtn.click();
  }
}

export { Fragment1 };
