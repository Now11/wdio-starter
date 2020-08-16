import { BaseFragment, ArrayElement, Log } from "../../../../lib";
@Log
class TableFragment extends BaseFragment {
  cell: ArrayElement;

  constructor({ root, name, isChildArr }) {
    super({ root, name, isChildArr });
    this.cell = this.initChild(ArrayElement, "tbody > :first-child td", "Table cells", { isChildArr: true });
  }

  async cellText() {
    const list1 = await this.cell.get(2);
    await list1.getText();
  }
}
export { TableFragment };
