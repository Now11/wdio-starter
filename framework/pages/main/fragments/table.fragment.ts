import { BaseFragment } from "../../../../lib";
import { TextElement } from "../../../../lib";

class TableFragment extends BaseFragment {
  cell: TextElement;

  constructor(root, name) {
    super(root, name);
    this.cell = this.initChild(TextElement, "tbody > :first-child :nth-child(3)", "Home button", { elemArr: true });
  }
}
export { TableFragment };
