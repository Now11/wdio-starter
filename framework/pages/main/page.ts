import { BasePage } from "../../../lib";
import { TableFragment, HeaderFragment } from "./fragments";

class MainPage extends BasePage {
  table: TableFragment;
  header: HeaderFragment;
  constructor() {
    super("body", "Main Page");
    this.table = this.initChild(TableFragment, ".wrapper :nth-child(3) > :nth-child(6)", "Header");
    this.header = this.initChild(HeaderFragment, ".navbar", "Header fragment");
  }
}
export { MainPage };
