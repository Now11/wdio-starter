import { BaseFragment } from "../../../../lib";
import { TextElement } from "../../../../lib";

class TableFragment extends BaseFragment {
  cell: TextElement;

  constructor(rootEl, name) {
    super(rootEl, name);
    this.cell = this.initChild(TextElement, "tbody > :first-child :nth-child(3)", "Home button");
  }
}
export { TableFragment };
