import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
	config: {
		selenium_port: process.env.SELENIUM_PORT || 4444,
		selenium_host: process.env.SELENIUM_HOST || 'localhost',
		selenium_path: process.env.SELENIUM_PATH || '/wd/hub',
		allure: Boolean(process.env.ALLURE) || false,
	},
	app: {
		baseUrl: process.env.APP_URL,
	},
};
