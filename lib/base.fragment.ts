import { Element, ElementArray } from 'webdriverio';

interface IFragment {
	root: () => Promise<Element | ElementArray>;
	name: string;
	isArr: boolean;
}

abstract class BaseFragment {
	private root: () => Promise<Element>;
	private name: string;
	protected element: Element;
	private isArr: boolean;

	constructor({ root, name, isArr }: { root: () => Promise<Element>; name: string; isArr?: boolean }) {
		this.root = root;
		this.name = name ? name : BaseFragment.name;
		this.isArr = isArr ? isArr : false;
	}

	private async initCurrentElement(): Promise<void> {
		this.element = await this.root();
	}

	private getChildElement(selector: string, name: string, isArr: boolean): IFragment {
		this.isArr = isArr;
		return {
			root: async () => {
				await this.initCurrentElement();

				if (this.isArr) {
					return this.element.$$(selector);
				}

				return this.element.$(selector);
			},
			name,
			isArr,
		};
	}

	protected initChild(childClass, selector: string, name: string, { isArr } = { isArr: false }, ...args) {
		return new childClass(this.getChildElement(selector, name, isArr), ...args);
	}
}

export { BaseFragment };
