import { BaseElement } from './base.element';
import { step } from '../report';

class Button extends BaseElement {
	constructor({ root, name }) {
		super({ root, name });
	}

	@step((name) => `${name} execute click by text`)
	async clickByText(text: string) {
		await this.waitForVisible(text);
		await this.element.click();
	}

	@step((name) => `${name} execute click`)
	async click(): Promise<void> {
		await this.waitForVisible();
		await this.element.click();
	}
}

export { Button };
