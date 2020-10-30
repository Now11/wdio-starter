import allure from '@wdio/allure-reporter';

async function stepAllure(name: string, cb: Function): Promise<string | object> {
	allure.startStep(name);
	const result = await cb();
	try {
		if (typeof result === 'string') {
			allure.addAttachment('Attachment', result);
		}
		if (typeof result === 'object') {
			allure.addAttachment('Attachment', JSON.stringify(result));
		}
		allure.endStep('passed');
		return result;
	} catch (error) {
		allure.endStep('failed');
		throw error;
	}
}

async function stepMethodAllure(stepName: string, cb: Function): Promise<string | object> {
	allure.startStep(stepName);
	const result: string | object = await cb();
	try {
		allure.endStep('passed');
		return result;
	} catch (error) {
		allure.endStep('failed');
		throw error;
	}
}

export { stepAllure, stepMethodAllure };
