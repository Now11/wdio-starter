import allure from '@wdio/allure-reporter';

async function stepAllure(name: string, cb: Function): Promise<string | object> {
	allure.startStep(name);

	try {
		const result = await cb();
		if (typeof result === 'string') {
			allure.addAttachment('Attachment', result, 'application/json');
		}
		if (typeof result === 'object') {
			allure.addAttachment('Attachment', JSON.stringify(result), 'application/json');
		}

		allure.endStep('passed');
		return result;
	} catch (error) {
		allure.endStep('failed');
		throw error;
	}
}

async function stepMethodAllure(stepName: string, cb: Function, ...args): Promise<string | object> {
	allure.startStep(stepName);
	allure.addAttachment('Attachment', args, 'application/json');
	try {
		const result = await cb(...args);
		allure.endStep('passed');
		return result;
	} catch (error) {
		allure.endStep('failed');
		throw error;
	}
}

export { stepAllure, stepMethodAllure };
