import { IElement } from '../common/interfaces';
import { ICustomElement } from '../common/interfaces/customElement.interface';
import { wait } from '../element_utils';
import { step } from '../report';

abstract class BaseElement {
	private root: (selectorModifier?: string) => Promise<IElement>;
	name: string;
	element: IElement;

	constructor({ root, name }: ICustomElement<IElement>) {
		this.root = root;
		this.name = name ? name : BaseElement.name;
	}

	protected async initCurrentElement(selectorModifier?: string) {
		this.element = await this.root(selectorModifier);
	}

	async waitForExist(selectorModifier?: string): Promise<void> {
		await this.initCurrentElement(selectorModifier);
		await wait.forElementToExist(this);
	}

	async waitForVisible(selectorModifier?: string): Promise<void> {
		await this.initCurrentElement(selectorModifier);
		await wait.forElementToBeVisible(this);
	}
}

export { BaseElement };
