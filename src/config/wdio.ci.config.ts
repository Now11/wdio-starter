import allure from '@wdio/allure-reporter';
import { Config } from 'webdriverio';
import * as path from 'path';
import * as expect from 'expect-webdriverio';

const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.join(ROOT_DIR, './output');
const SPECS = path.join(ROOT_DIR, 'specs/**/*.spec.ts');

const config: Config = {
	path: '/wd/hub',
	port: Number(process.env.SELENIUM_PORT),
	hostname: process.env.SELENIUM_HOST,
	specs: [SPECS],
	maxInstances: 1,
	capabilities: [
		{
			maxInstances: 1,
			browserName: 'chrome',
			'goog:chromeOptions': {
				args: ['window-size=1440,960', '--headless', '--disable-dev-shm-usage', '--disable-notifications'],
			},
		},
	],

	logLevel: 'debug',
	bail: 0,
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

	//outputDir: OUTPUT_DIR,

	before: function () {
		expect.setOptions({ interval: 200, wait: 10000 });
	},

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
