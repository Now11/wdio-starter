import { stepAllure, stepMethodAllure } from './allure';

function decorateService(target: Function): void {
	const originalMethods = Object.getOwnPropertyNames(target.prototype)
		.filter((method) => method !== 'constructor')
		.filter((method) => typeof target.prototype[method] === 'function');

	originalMethods.forEach((method) => {
		const fn = target.prototype[method];
		target.prototype[method] = function (...args) {
			const localStepName = `${target.prototype.constructor.name} call method ${method}`;
			return stepMethodAllure(localStepName, fn.bind(this), ...args);
		};
	});
}

function step(stepName: string | Function): Function {
	return function (_target, _name, descriptor) {
		const currValue = descriptor.value;

		descriptor.value = function (...args) {
			let currentStepName = stepName;
			currentStepName = (typeof currentStepName === 'string'
				? currentStepName
				: currentStepName(this.name)) as string;
			const currArgs = args.length !== 0 ? `with arguments: ${JSON.stringify(args)}` : '';
			if (this.constructor.name.includes('Element')) {
				currentStepName = `${currentStepName} ${currArgs}`;
			}

			if (this.constructor.name.includes('Browser')) {
				currentStepName = `${currentStepName} ${args[0] ? args[0] : ''}`;
			}
			return stepAllure(currentStepName, currValue.bind(this, ...args));
		};
		return descriptor;
	};
}

export { step, decorateService as Log };
