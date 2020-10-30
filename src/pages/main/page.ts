import { BasePage, Log } from '../../../lib';
import { TableFragment, HeaderFragment } from './fragments';

@Log
class MainPage extends BasePage {
	table: TableFragment;
	header: HeaderFragment;
	constructor() {
		super('body', 'Main Page');
		this.table = this.initChild(TableFragment, '.wrapper :nth-child(3) > :nth-child(6)', 'Header');
		this.header = this.initChild(HeaderFragment, '.navbar', 'Header fragment');
	}

	async cellText(index: number) {
		return await this.table.cellText(index);
	}
}
export { MainPage };
