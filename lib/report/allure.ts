import allure from '@wdio/allure-reporter';

async function stepAllure(name: string, cb: Function, args: any[]): Promise<void> {
	allure.startStep(name);
	if (args.length) {
		allure.addAttachment('Arguments', JSON.stringify(args), 'text/plain');
	}

	try {
		await cb();
		allure.endStep('passed');
	} catch (error) {
		allure.endStep('failed');
		throw error;
	}
}

async function stepMethodAllure(stepName: string, cb: Function, ...args: any[]): Promise<void> {
	allure.startStep(stepName);
	if (args.length) {
		allure.addAttachment('Arguments', JSON.stringify(args), 'text/plain');
	}

	try {
		await cb(...args);
		allure.endStep('passed');
	} catch (error) {
		allure.endStep('failed');
		throw error;
	}
}

export { stepAllure, stepMethodAllure };
