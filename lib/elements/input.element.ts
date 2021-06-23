import { BaseElement } from './base.element';
import { step } from '../report';

class Input extends BaseElement {
	constructor({ root, name }) {
		super({ root, name });
	}

	@step((name) => `${name} execute get text`)
	async getText(): Promise<string> {
		await this.waitForExist();
		return this.element.getAttribute('value');
	}

	@step((name) => `${name} execute sendKeys`)
	async sendKeys(keys: string): Promise<void> {
		await this.waitForVisible();
		await this.element.setValue(keys);
	}
}

export { Input };
