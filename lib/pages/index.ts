import { Element } from 'webdriverio';

abstract class BasePage {
	private root: string;
	private name: string;
	protected element: Element;
	constructor(root: string, name: string) {
		this.root = root;
		this.name = name ? name : BasePage.name;
	}

	private async initCurrentElement() {
		this.element = await $(this.root);
	}

	private getChildElement(selector: string): () => Promise<Element> {
		return async () => {
			await this.initCurrentElement();
			return this.element.$(selector);
		};
	}

	protected initChild(childClass, selector: string, name: string, ...args) {
		return new childClass({ root: this.getChildElement(selector), name }, ...args);
	}
}
export { BasePage };
