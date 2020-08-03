import { Element } from "webdriverio";

class BasePage {
  private root: string;
  private name: string;

  constructor(root: string, name?: string) {
    this.root = root;
    this.name = name || BasePage.name;
  }

  protected getElement(fragmentRoot: string) {
    return async () => {
      const root = await $(this.root);
      return await root.$(fragmentRoot);
    };
  }

  //TO DO: add waitForExist method

  protected initChild(childClass, selector: string, ...args) {
    return new childClass(this.getElement(selector), ...args);
  }
}
export { BasePage };
