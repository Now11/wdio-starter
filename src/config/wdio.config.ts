import allure from '@wdio/allure-reporter';
import { Config } from 'webdriverio';
import * as path from 'path';
import * as expect from 'expect-webdriverio';

const ROOT_DIR = process.cwd();
const SPECS = path.join(ROOT_DIR, 'specs/**/*.spec.ts');

const config: Config = {
	path: '/wd/hub',
	port: 4444,
	hostname: 'localhost',
	specs: [SPECS],
	maxInstances: 5,
	capabilities: [
		{
			browserName: 'chrome',
			'goog:chromeOptions': {
				//args: ['window-size=1440,960', '--disable-dev-shm-usage', '--disable-notifications'],
				args: ['window-size=1440,960', '--disable-notifications', '--headless'],
			},
			'selenoid:options': {
				enableVNC: false,
				enableVideo: false,
			},
		},
	],

	logLevel: 'silent',
	bail: 0,
	waitforTimeout: 10000,
	connectionRetryTimeout: 60000,

	connectionRetryCount: 3,

	framework: 'mocha',

	reporters: [
		'spec',
		[
			'allure',
			{
				outputDir: 'allure-results',
				disableMochaHooks: true,
				disableWebdriverScreenshotsReporting: false,
				disableWebdriverStepsReporting: true,
			},
		],
	],

	mochaOpts: {
		ui: 'bdd',
		timeout: 90000,
		require: 'ts-node/register',
	},

	before: function () {
		expect.setOptions({ interval: 200, wait: 10000 });
		this.a = 15;
	},

	afterTest: async function (test, context, { error, result, duration, passed, retries }) {
		if (error) {
			const currentUrl = await browser.getUrl();
			allure.startStep(`Screenshot current url: ${currentUrl} `);
			await browser.takeScreenshot();
			allure.endStep('failed');
		}
	},
	beforeTest() {
		this.a = 15;
	},
	beforeSession: function () {
		//wait for debugger
		if (process.env.DEBUG) {
			return new Promise((resolve) => setTimeout(resolve, 5000));
		}
	},
};

if (process.env.DEBUG) {
	console.log('############# RUNNING IN DEBUG MODE! ###############');
	config.capabilities[0]['goog:chromeOptions'].args = ['window-size=1440,960'];
	config.logLevel = 'debug';
	config['execArgv'] = ['--inspect=127.0.0.1:5252'];
	config.mochaOpts['timeout'] = 360000;
	config.maxInstances = 1;
}

export { config };
