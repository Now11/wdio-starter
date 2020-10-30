import { Element } from 'webdriverio';
import { wait } from '../element_utils';
import { step } from '../report';

abstract class BaseElement {
	private root: () => Promise<Element>;
	protected name: string;
	protected element: Element;

	constructor({ root, name }: { root: () => Promise<Element>; name?: string }) {
		this.root = root;
		this.name = name ? name : BaseElement.name;
	}

	protected async initCurrentElement() {
		this.element = await this.root();
	}

	get elementName(): string {
		return this.name;
	}

	async waitForExist(): Promise<void> {
		await this.initCurrentElement();
		await wait.elementForExist(this);
	}

	async waitForVisible(): Promise<void> {
		await this.initCurrentElement();
		await wait.elementForVisible(this);
	}

	@step((name) => `${name} execute click`)
	async click(): Promise<void> {
		await this.waitForVisible();
		await this.element.click();
	}

	@step((name) => `${name} execute sendKeys`)
	async sendKeys(keys: string): Promise<void> {
		await this.waitForVisible();
		await this.element.setValue(keys);
	}

	@step((name) => `${name} execute get text`)
	async getText(): Promise<string> {
		await this.waitForVisible();
		return this.element.getText();
	}
}

export { BaseElement };
