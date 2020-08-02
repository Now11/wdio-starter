import { Fragment1 } from "./header.fragment";
import { BasePage } from "./base.page";
class MainPage extends BasePage {
  header: Fragment1;
  constructor() {
    super("body");
    this.header = this.initChild(Fragment1, this.initElementFn(".navbar-right"));
  }
}
export { MainPage };
