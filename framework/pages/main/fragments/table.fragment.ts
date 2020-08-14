import { BaseFragment } from "../../../../lib";
import { TextElement } from "../../../../lib";
import { ElementArray } from "webdriverio";

class TableFragment extends BaseFragment {
  cell: TextElement;

  constructor(root, name) {
    super(root, name);
    this.cell = this.initChild(TextElement, "tbody > :first-child td", "Table cell", { isChildArr: true });
  }

  async cellText() {
    const a: any = await this.cell.currentElement;
    await a.forEach(async (el) => {
      const text = await el.getText();
      console.log(text);
    });
  }
}
export { TableFragment };
