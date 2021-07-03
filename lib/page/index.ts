import { IPage, IElement, IElementArray } from '../common/interfaces';

abstract class BasePage {
	private root: ((selectorModifier?: string) => Promise<IElement>) | string;
	private name: string;
	private index: number | null;

	constructor({ root, name, index }: IPage<IElement>) {
		this.root = root;
		this.name = name ?? BasePage.name;
		this.index = index;
	}

	private initElement(): Promise<IElement> {
		if (typeof this.root === 'string') {
			return $(this.root);
		}
		return this.root() as Promise<IElement>;
	}

	private getChildElement(selector: string, name: string, index: number | null): IPage<IElement> {
		return {
			root: async function (selectorModifier?) {
				const el = await this.initElement();
				if (index) {
					return (await el.$$(selector))[index];
				}

				if (selectorModifier) {
					return el.$(selector.replace('TEXT_TO_REPLACE', selectorModifier));
				}
				return el.$(selector);
			}.bind(this),
			name,
		};
	}

	private getChildElements(selector: string, name: string): IPage<IElementArray> {
		return {
			root: async () => (await this.initElement()).$$(selector),
			name,
		};
	}

	protected initChild<T>(
		childClass: new (...args: any[]) => T,
		selector: string,
		name: string,
		{ index } = { index: null },
	) {
		return new childClass(this.getChildElement(selector, name, index));
	}

	protected initChilds<T>(childClass: new (...args: any[]) => T, selector: string, name?: string) {
		return new childClass(this.getChildElements(selector, name));
	}
}

export { BasePage };
