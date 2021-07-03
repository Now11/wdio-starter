import { BaseElement } from './base.element';
import { step } from '../report';

class Text extends BaseElement {
	constructor({ root, name }) {
		super({ root, name });
	}

	@step((name) => `${name} execute get text`)
	async getText(): Promise<string> {
		await this.waitForVisible();
		return this.element.getText();
	}
}

export { Text };
