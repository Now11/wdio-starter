function step(stepName: string | Function) {
  return function (_target, _name, descriptor) {
    const originalValue = descriptor.value;

    descriptor.value = function (...args) {
      stepName = "\n" + ((typeof stepName === "string" ? stepName : stepName(this.name)) as string);
      return originalValue.call(this, ...args);
    };
    return descriptor;
  };
}

export { step };
