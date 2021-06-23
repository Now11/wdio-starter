import { stepAllure, stepMethodAllure } from './allure';

function decorateService(target: Function): void {
	const originalMethods = Object.getOwnPropertyNames(target.prototype)
		.filter((prop) => prop !== 'constructor')
		.filter(
			(prop) =>
				!(
					'set' in (Object.getOwnPropertyDescriptor(target.prototype, prop) as PropertyDescriptor) ||
					'get' in (Object.getOwnPropertyDescriptor(target.prototype, prop) as PropertyDescriptor)
				),
		);

	originalMethods.forEach((method) => {
		const fn = target.prototype[method];
		target.prototype[method] = async function (...args) {
			const localStepName = `${target.prototype.constructor.name} call method ${method}`;
			return stepMethodAllure(localStepName, fn.bind(this), ...args);
		};
	});
}

function step(stepName: string | Function): Function {
	return function (_target: Function, _name: string, descriptor: PropertyDescriptor) {
		const currValue = descriptor.value;

		descriptor.value = async function (...args) {
			let currentStepName = stepName;
			currentStepName = (
				typeof currentStepName === 'string' ? currentStepName : currentStepName(this.name)
			) as string;

			return stepAllure(currentStepName, currValue.bind(this, ...args), args);
		};
		return descriptor;
	};
}

export { step, decorateService as Log };
