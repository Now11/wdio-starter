import { BaseFragment } from "../../../../lib";
import { TextElement, ArrayElement } from "../../../../lib";

class TableFragment extends BaseFragment {
  cell: ArrayElement;

  constructor(root, name, isChildArr) {
    super(root, name, isChildArr);
    this.cell = this.initChild(ArrayElement, "tbody > :first-child td", "Table cell", { isChildArr: true });
  }

  async cellText() {
    const a = await this.cell.list;
    console.log(a);
    await a.forEach(async (el) => {
      const text = await el.getText();
      console.log(text);
    });
  }
}
export { TableFragment };
