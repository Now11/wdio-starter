import { stepAllure, stepMethodAllure } from './allure';

function decorateService(target) {
  const originalMethods = Object.getOwnPropertyNames(target.prototype)
    .filter((method) => method !== 'constructor')
    .filter((method) => typeof target.prototype[method] === 'function');

  originalMethods.forEach((method) => {
    const fn = target.prototype[method];
    target.prototype[method] = function (...args) {
      const localStepName = `${target.prototype.constructor.name} call method ${method}`;
      return stepMethodAllure(localStepName, fn.bind(this, ...args));
    };
  });
}

function step(stepName: string | Function) {
  return function (_target, _name, descriptor) {
    const currValue = descriptor.value;

    descriptor.value = function (...args) {
      let cuurentStepName = stepName;
      cuurentStepName = '\n' + ((typeof cuurentStepName === 'string' ? cuurentStepName : cuurentStepName(this.name)) as string);
      const currArgs = args.length !== 0 ? `with arguments ${JSON.stringify(args)}` : '';
      if (this.constructor.name.includes('Element')) {
        cuurentStepName = `\t ${cuurentStepName} ${currArgs}`;
      }

      if (this.constructor.name.includes('Browser')) {
        cuurentStepName = `${cuurentStepName} ${args[0] ? args[0] : ''}`;
      }
      return stepAllure(cuurentStepName, currValue.bind(this, ...args));
    };
    return descriptor;
  };
}

export { step, decorateService as Log };
