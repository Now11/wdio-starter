import { baseConfig } from './base.config';

const config: WebdriverIO.Config = {
	...baseConfig,
	logLevel: 'silent',
	capabilities: [
		{
			maxInstances: 2,
			browserName: 'chrome',
			'goog:chromeOptions': {
				args: [
					'window-size=1440,960',
					'--disable-notifications',
					'--headless',
					'--disable-gpu',
					'--no-sandbox', // need for docker container if User inside docker isn't defined
				],
			},
			'selenoid:options': {
				enableVNC: false,
				enableVideo: false,
			},
		},
	],
};

export { config };
