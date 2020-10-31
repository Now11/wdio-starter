import allure from '@wdio/allure-reporter';
import { Config } from 'webdriverio';
import * as path from 'path';

const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.join(ROOT_DIR, 'output');
const SPECS = path.join(ROOT_DIR, 'specs/**/*.spec.ts');

const config: Config = {
	runner: 'local',
	path: '/wd/hub',
	port: 4444,
	specs: [SPECS],
	maxInstances: 5,
	capabilities: [
		{
			browserName: 'chrome',
			'goog:chromeOptions': {
				args: ['window-size=1440,960', '--headless'],
			},
		},
	],

	logLevel: 'silent',
	bail: 0,
	baseUrl: '',
	waitforTimeout: 10000,

	connectionRetryTimeout: 120000,

	connectionRetryCount: 3,
	services: ['selenium-standalone'],
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
		timeout: 60000,
		require: 'ts-node/register',
	},

	outputDir: OUTPUT_DIR,

	afterTest: async function (test, context, { error, result, duration, passed, retries }) {
		if (error) {
			const currentUrl = await browser.getUrl();
			allure.startStep(`Screenshot current url: ${currentUrl} `);
			await browser.takeScreenshot();
			allure.endStep('failed');
		}
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
