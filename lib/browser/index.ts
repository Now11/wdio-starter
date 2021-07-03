import { step } from '../report';

class BrowserInterface {
	@step(`Browser: navigate to URL`)
	async url(url: string): Promise<void> {
		await browser.url(url);
	}

	@step(`Browser: get current URL`)
	async getCurrentUrl(): Promise<string> {
		return browser.getUrl();
	}

	async reloadSession(): Promise<void> {
		await browser.reloadSession();
	}
}

const browserInterface = new BrowserInterface();

export { browserInterface };
