@decorateClass
class T {
	async method1(a): Promise<any> {
		return a;
	}

	@decorateMethod('asd')
	async methodb(a): Promise<any> {
		return a;
	}
	get a() {
		return 'asd';
	}
}

function decorateMethod(stepName) {
	return function (_target, _name, descriptor) {
		const originalValue = descriptor.value;
		descriptor.value = function (...args) {
			console.log(`${_name}`);
			return originalValue.call(this, ...args);
		};
	};
}

function decorateClass(target: Function) {
	const methods = Object.getOwnPropertyNames(target.prototype)
		.filter((prop) => prop !== 'constructor')
		.filter((prop) => typeof target.prototype[prop] === 'function');

	methods.forEach((prop) => {
		const originMethod = target.prototype[prop];
		target.prototype[prop] = function (...args) {
			console.log(`${target.name} call method ${prop}`);
			return originMethod.call(this, ...args);
		};
	});
}

(async () => {
	const t = new T();
	const c1 = await t.method1(1);
	const c2 = await t.methodb(2);

	console.log(c1, c2);
})();
