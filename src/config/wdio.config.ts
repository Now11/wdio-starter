import { baseConfig } from './base.config';

const config: WebdriverIO.Config = {
	...baseConfig,

	logLevel: 'debug',
	capabilities: [
		{
			maxInstances: 2,
			acceptInsecureCerts: true,
			browserName: 'chrome',
			'goog:chromeOptions': {
				args: ['window-size=1440,960', '--disable-notifications'],
			},
		},
	],

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
