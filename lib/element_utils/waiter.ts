import { Element, ElementArray } from 'webdriverio';

interface IElementType<T> {
	element: T;
	name: string;
}

const wait = {
	elementForVisible: async (ctx): Promise<boolean> => {
		const { element, name }: IElementType<Element> = ctx;
		return element.waitForDisplayed({ timeout: 1000, timeoutMsg: `Element ${name} should be visible` });
	},

	elementForExist: async (ctx): Promise<boolean> => {
		const { element, name }: IElementType<Element> = ctx;
		return element.waitForExist({ timeout: 5000, timeoutMsg: `Element ${name} should exist` });
	},

	forListToNotEmpty: async (ctx): Promise<boolean> => {
		const { element, name }: IElementType<ElementArray> = ctx;
		return browser.waitUntil(
			async () => {
				return element.length > 0;
			},
			{ timeout: 5000, interval: 200, timeoutMsg: `${name} is empty` },
		);
	},

	listElementForVisible: async ({ ctx, index }): Promise<boolean> => {
		const { element, name }: IElementType<ElementArray> = ctx;
		return element[index].waitForDisplayed({ timeout: 5000, timeoutMsg: `Element ${name} should be visible` });
	},

	listElementToExist: async ({ ctx, index }): Promise<boolean> => {
		const { element, name }: IElementType<ElementArray> = ctx;
		return element[index].waitForDisplayed({ timeout: 5000, timeoutMsg: `Element ${name} should exist` });
	},
};

export { wait };
