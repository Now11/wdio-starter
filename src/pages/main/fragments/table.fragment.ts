import { BaseFragment, ArrayElement, Log } from '../../../../lib';
@Log
class TableFragment extends BaseFragment {
	cells: ArrayElement;

	constructor({ root, name }) {
		super({ root, name });
		this.cells = this.initChild(ArrayElement, 'tbody > :first-child td', 'Table cells', { isArr: true });
	}

	async cellText(index: number) {
		return await this.cells.getText(index);
	}
}
export { TableFragment };
