import { BaseFragment, ArrayElement, Log } from '../../../../lib';
@Log
class TableFragment extends BaseFragment {
  cells: ArrayElement;

  constructor({ root, name, isChildArr }) {
    super({ root, name, isChildArr });
    this.cells = this.initChild(ArrayElement, 'tbody > :first-child td', 'Table cells', { isChildArr: true });
  }

  async cellText(index: number) {
    return await this.cells.getText(index);
  }
}
export { TableFragment };
