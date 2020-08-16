function decorateService(target) {
  console.log(Object.getOwnPropertyNames(target.prototype.constructor));
  const methods = Object.getOwnPropertyNames(target.prototype)
    .filter((method) => method !== "constructor")
    .filter((method) => typeof target.prototype[method] === "function");

  methods.forEach((method) => {
    const fn = target.prototype[method];
    target.prototype[method] = function (...args) {
      console.log(`${target.prototype.constructor.name} call method ${method}`);
      return fn.call(this, ...args);
    };
  });
}

export { decorateService as Log };

//TO DO: Step Decorator

// function step(stepName: string | Function) {
//   return function (_target, _name, descriptor) {
//     const originalValue = descriptor.value;

//     descriptor.value = function (...args) {
//       stepName = "\n" + ((typeof stepName === "string" ? stepName : stepName(this.name)) as string);
//       if (this.constructor.name.includes("Fragment")) {
//         stepName = `\t ${stepName} arguments ${JSON.stringify(args)}`;
//       }
//       console.log(stepName);
//       return originalValue.call(this, ...args);
//     };

//     return descriptor;
//   };
// }

// export { step };
