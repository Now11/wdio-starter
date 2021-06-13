import allure from '@wdio/allure-reporter';

async function stepAllure(name: string, cb: Function, args: any[]): Promise<void> {
	allure.startStep(name);

	try {
		await cb();
		allure.addAttachment('Arguments', JSON.stringify(args), 'text/plain');
		allure.endStep('passed');
	} catch (error) {
		console.log(error);
		allure.endStep('canceled');
		throw error;
	}
}

async function stepMethodAllure(stepName: string, cb: Function, ...args): Promise<void> {
	allure.startStep(stepName);
	allure.addAttachment('Arguments', JSON.stringify(args), 'text/plain');
	try {
		await cb(...args);
		allure.endStep('passed');
	} catch (error) {
		console.log(error);
		allure.endStep('canceled');
		throw error;
	}
}

export { stepAllure, stepMethodAllure };
