import { step } from '../report';

class BrowserInterface {
  @step(`Browser: navigate to URL`)
  async url(url: string) {
    await browser.url(url);
  }

  @step(`Browser: get current URL`)
  async getCurrentUrl() {
    return browser.getUrl();
  }

  async reloadSession() {
    await browser.reloadSession();
  }
}

const browserInterface = new BrowserInterface();

export { browserInterface };
