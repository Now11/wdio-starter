import { Element } from "webdriverio";
import { wait } from "./element_utils";

abstract class BasePage {
  private root: string;
  private name: string;
  protected element: Element;
  constructor(root: string, name: string) {
    this.root = root;
    this.name = name ? name : BasePage.name;
  }

  private async initCurrentElement() {
    this.element = await $(this.root);
  }

  protected get pageName() {
    return this.name;
  }
  private getChildElement(selector: string) {
    return async (): Promise<Element> => {
      await this.initCurrentElement();
      return await this.element.$(selector);
    };
  }

  protected initChild(childClass, selector: string, name: string, ...args) {
    return new childClass({ root: this.getChildElement(selector), name }, ...args);
  }
}
export { BasePage };
