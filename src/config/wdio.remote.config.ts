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
	hostname: '172.17.0.2', // selenoid or seleniumd node IP address
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

	logLevel: 'debug',
	bail: 0,
	baseUrl: '',
	waitforTimeout: 10000,

	connectionRetryTimeout: 120000,

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
		timeout: 60000,
		require: 'ts-node/register',
	},

	outputDir: OUTPUT_DIR,

	afterTest: async function (test, context, { error, result, duration, passed, retries }) {
		if (error) {
			const currentUrl = await browser.getUrl();
			allure.startStep(`Screenshot current url: ${currentUrl} `);
			await browser.takeScreenshot();
			allure.endStep('passed');
		}
	},

	beforeSession: function () {},
};

export { config };
