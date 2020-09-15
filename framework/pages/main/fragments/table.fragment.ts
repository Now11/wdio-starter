import { BaseFragment, ArrayElement } from "../../../../lib";

class TableFragment extends BaseFragment {
  cell: ArrayElement;

  constructor({ root, name, isChildArr }) {
    super({ root, name, isChildArr });
    this.cell = this.initChild(ArrayElement, "tbody > :first-child td1", "Table cells", { isChildArr: true });
  }

  async cellText(index: number) {
    return await this.cell.getText(index);

  }
}
export { TableFragment };
