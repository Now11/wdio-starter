import { BaseElement } from './base.element';

class InputElement extends BaseElement {
	constructor({ root, name }) {
		super({ root, name });
	}

	async getText(): Promise<string> {
		await this.waitForExist();
		return this.element.getAttribute('value');
	}
}

export { InputElement };
