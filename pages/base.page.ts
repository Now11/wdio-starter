class BasePage {
  root: string;
  constructor(root: string) {
    this.root = root;
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
export { BasePage };
