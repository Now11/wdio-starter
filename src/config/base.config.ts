import { env } from '../env';
import allure from '@wdio/allure-reporter';

import * as path from 'path';
import * as expect from 'expect-webdriverio';

const ROOT_DIR = process.cwd();
const OUTPUT_DIR = path.join(ROOT_DIR, 'output');
const SPECS = path.join(ROOT_DIR, 'specs/**/*.spec.ts');

const baseConfig: WebdriverIO.Config = {
	runner: 'local',
	path: env.config.selenium_path,
	port: Number(env.config.selenium_port),
	hostname: env.config.selenium_host,
	specs: [SPECS],
	maxInstances: 2,
	// should be overwritten
	capabilities: [],

	logLevel: 'debug',
	bail: 0,
	waitforTimeout: 10000,
	connectionRetryTimeout: 60000,

	connectionRetryCount: 3,

	framework: 'mocha',

	reporters: ['spec'],

	mochaOpts: {
		ui: 'bdd',
		timeout: 360000,
	},

	baseUrl: env.app.baseUrl,

	before: function () {
		expect.setOptions({ interval: 200, wait: 10000 });
	},

	afterTest: async function (test, context, { error, result, duration, passed, retries }) {
		if (error) {
			const currentUrl = await browser.getUrl();
			allure.startStep(`Screenshot current url: ${currentUrl} `);
			await browser.takeScreenshot();
			allure.endStep('failed');
		}
	},
	//outputDir: OUTPUT_DIR,
};

if (env.config.allure) {
	baseConfig.reporters.push([
		'allure',
		{
			outputDir: 'allure-results',
			disableMochaHooks: true,
			disableWebdriverScreenshotsReporting: false,
			disableWebdriverStepsReporting: true,
		},
	]);
}

export { baseConfig };
