import { BasePage } from "../../../lib";
import { TableFragment } from "./fragments";

class MainPage extends BasePage {
  table: TableFragment;

  constructor() {
    super(".wrapper", "Main Page");
    this.table = this.initChild(TableFragment, ":nth-child(3) > :nth-child(6)", "Header");
  }

  async getTableCellText() {
    return await this.table.cell.getText();
  }
}
export { MainPage };
