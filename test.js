// fixtures.js
const parsef = require('parse-function')({ ecmaVersion: 2017 }).parse;

const moduleFixtures = {};
const sessionFixtures = {};
const fixtures = {}


const getCallerPath = () => {
    const _ = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const stack = new Error().stack.slice(1);
    Error.prepareStackTrace = _;
    return stack[1].getFileName();
};


const getArgNames = f => parsef(f).args;


const func = (cb, filename, testFixtures = {}) => {
    const argNames = getArgNames(cb);
    const args = [];
    for (const argName of argNames) {
        const arg = getArg(argName, filename, testFixtures);
        args.push(arg);
    };

    return () => cb(...args);
};


const getArg = (name, filename, testFixtures) => {
    if (name in testFixtures) {
        return testFixtures[name]
    }

    if (name in (moduleFixtures[filename] || {})) {
        return moduleFixtures[filename][name]
    }

    if (name in sessionFixtures) {
        return sessionFixtures[name]
    }

    const { fixture, scope } = `${filename}${name}` in fixtures
        ? fixtures[`${filename}${name}`]
        : fixtures[name];
    const result = func(fixture, filename, testFixtures)();

    if (scope === 'session') {
        sessionFixtures[name] = result;

    } else if (scope === 'module') {

        if (!(filename in moduleFixtures)) {
            moduleFixtures[filename] = {}
        }

        moduleFixtures[filename][name] = result;

    } else {
        testFixtures[name] = result;
    }
    return result;
};


global.fit = (name, cb) => {
    const filename = getCallerPath();
    global.it(name, () => func(cb, filename))
}


global.fixture = (name, func, scope) => {
    const filename = scope === 'session' ? '' : getCallerPath();
    fixtures[`${filename}${name}`] = { fixture: func, scope: scope, filename: filename }
}

// test_1.js
fixture('sessionFix', () => {
    console.log('should be called one time per session');
    return 'session fixture';
}, scope = 'session');

fixture('moduleFix', sessionFix => {
    console.log('should be called one time per module');
    return 'module fixture';
}, scope = 'module');

fixture('testFix', moduleFix => {
    console.log('should be called one time per test');
    return 'test fixture';
});

describe('scope', () => {

    fit('should pass', (testFix, moduleFix, sessionFix) => {
        console.log(testFix, moduleFix, sessionFix);
    });

    fit('should pass', (sessionFix, moduleFix, testFix) => {
        console.log(sessionFix, moduleFix, testFix);
    });
});

// test_2.js
fixture('moduleFix', sessionFix => {
    console.log('should be called one time per module');
    return 'module fixture';
}, scope = 'module');

fixture('testFix', (sessionFix, moduleFix) => {
    console.log('should be called one time per test');
    return 'test fixture';
});

describe('scope', () => {

    fit('should pass', async testFix => {
        await Promise.resolve().then(() => console.log(testFix));
    });

    fit('should pass', async testFix => {
        await Promise.resolve().then(() => console.log(testFix));
    });
});

/*
➜  ~ ./node_modules/mocha/bin/mocha test_1.js test_2.js --file fixtures.js


  scope
should be called one time per session
should be called one time per module
should be called one time per test
    ✓ should pass
should be called one time per test
    ✓ should pass

  scope
should be called one time per module
should be called one time per test
    ✓ should pass
should be called one time per test
    ✓ should pass


  4 passing (13ms)
*/