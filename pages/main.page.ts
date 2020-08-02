import { Fragment1 } from "./header.fragment";

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
