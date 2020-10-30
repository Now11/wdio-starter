import { ElementArray } from 'webdriverio';
import { wait } from '../element_utils';
import { step } from '../report';

class ArrayElement {
	private root: () => Promise<ElementArray>;
	private name: string;
	private element: ElementArray;
	constructor({ root, name }: { root: () => Promise<ElementArray>; name: string }) {
		this.root = root;
		this.name = name ? name : ArrayElement.name;
	}

	get elementName(): string {
		return this.name;
	}

	protected async initElementList(): Promise<void> {
		this.element = await this.root();
		await wait.forListToNotEmpty(this);
	}

	private async waitForVisible(index: number): Promise<void> {
		await this.initElementList();
		await wait.listElementForVisible({ ctx: this, index });
	}

	private async waitForExist(index): Promise<void> {
		await this.initElementList();
		await wait.listElementToExist({ ctx: this, index });
	}

	@step((name) => `${name} execute get element text`)
	async getText(index: number): Promise<string> {
		await this.waitForExist(index);
		return this.element[index].getText();
	}

	@step((name) => `${name} execute click`)
	async click(index: number): Promise<void> {
		await this.waitForVisible(index);
		await this.element[index].click();
	}

	@step((name) => `${name} execute sendKeys`)
	async sendKeys({ index, keys }: { index: number; keys: string }): Promise<void> {
		await this.waitForVisible(index);
		await this.element[index].setValue(keys);
	}
}

export { ArrayElement };
