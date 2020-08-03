import { BasePage } from "../../../lib";
import { HeaderFragment } from "./fragments";

class MainPage extends BasePage {
  header: HeaderFragment;

  constructor() {
    super("body", "Main Page");
    this.header = this.initChild(HeaderFragment, ".navbar-right", "Main page header");
  }
}
export { MainPage };
