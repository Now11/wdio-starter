import { IWaitContext, IWaitContextArray } from '../common/interfaces';

const wait = {
	forElementToBeVisible: async (ctx: IWaitContext): Promise<boolean | void> => {
		const { element, name } = ctx;
		return element.waitForDisplayed({ timeout: 10000, timeoutMsg: `Element ${name} isn't visible` });
	},

	forElementToExist: async (ctx: IWaitContext): Promise<boolean | void> => {
		const { element, name } = ctx;
		return element.waitForExist({ timeout: 10000, timeoutMsg: `Element ${name} does not exist` });
	},

	forListToBeVisible: async (ctx: IWaitContextArray): Promise<void> => {
		const { elements, name } = ctx;
		const elems = elements.map((element) => {
			element.waitForDisplayed({
				timeout: 10000,
				timeoutMsg: `All elements aren't visible from the ${name} list`,
			});
		});

		await Promise.all(elems);
	},

	forListToExist: async (ctx: IWaitContextArray): Promise<void> => {
		const { elements, name } = ctx;
		const elems = elements.map((element) => {
			element.waitForDisplayed({
				timeout: 10000,
				timeoutMsg: `All elements aren't visible from the ${name} list`,
			});
		});

		await Promise.all(elems);
	},
};

export { wait };
