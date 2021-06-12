import { IElementArray } from '../common/interfaces';
import { ICustomElement } from '../common/interfaces/customElement.interface';
import { wait } from '../element_utils';
import { step } from '../report';

class ElementsList {
	private root: () => Promise<IElementArray>;
	name: string;
	elements: IElementArray;
	constructor({ root, name }: ICustomElement<IElementArray>) {
		this.root = root;
		this.name = name ? name : ElementsList.name;
	}

	protected async initElementList(): Promise<void> {
		this.elements = await this.root();
	}

	private async waitForVisible(): Promise<void> {
		await this.initElementList();
		await wait.forListToBeVisible(this);
	}

	private async waitForExist(): Promise<void> {
		await this.initElementList();
		await wait.forListToExist(this);
	}

	@step((name) => `${name} execute get element text`)
	async getText(index: number): Promise<string> {
		await this.waitForExist();
		return this.elements[index].getText();
	}

	@step((name) => `${name} execute click`)
	async click(index: number): Promise<void> {
		await this.waitForVisible();
		await this.elements[index].click();
	}
}

export { ElementsList };
