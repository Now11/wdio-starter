import { BasePage } from "../../../lib";
import { TableFragment, HeaderFragment } from "./fragments";

class MainPage extends BasePage {
  table: TableFragment;
  header: HeaderFragment;
  constructor() {
    super("body", "Main Page");
    this.table = this.initChild(TableFragment, ".wrapper :nth-child(3) > :nth-child(6)", "Table fragment");
    this.header = this.initChild(HeaderFragment, ".navbar", "Header fragment");
  }

  async gg() {
    console.log(this.pageName);
  }
}
export { MainPage };
