import { Element } from "webdriverio";
class BaseElement {
  protected root: () => Promise<Element>;

  get element(): Promise<Element> {
    return this.root();
  }

  constructor(root: () => Promise<Element>) {
    this.root = root;
    console.log(this);
  }
}

class Button extends BaseElement {
  async click() {
    const elem = await this.element;

    await elem.waitForDisplayed({ timeout: 5000 });
    await elem.click();
  }
}

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

class MainPage {
  root: string;
  header: Fragment1;
  constructor(root: string) {
    this.root = root;
    this.header = this.initChild(Fragment1, this.initElementFn(".navbar-right"));
    console.log(this);
  }

  protected initElementFn(selector: string) {
    return async () => {
      const root = await $(this.root);
      return await root.$(selector);
    };
  }

  protected initChild(childClass, fn: Function) {
    return new childClass(fn);
  }
}

export { MainPage };
