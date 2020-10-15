import { Element } from 'webdriverio';

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

  protected getChildElement(selector: string, name: string) {
    return {
      root: async (): Promise<Element> => {
        await this.initCurrentElement();
        return await this.element.$(selector);
      },
      name,
    };
  }

  protected initChild(childClass, selector: string, name: string, ...args) {
    return new childClass(this.getChildElement(selector, name), ...args);
  }
}
export { BasePage };
