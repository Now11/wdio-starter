import { step } from "../report";

class BrowserInterface {
    @step(`Browser execute navigate to URL`)
    async url(url: string) {
        await browser.url(url);
    }

    @step(`Browser return url`)
    async getCurrentUrl() {
        return browser.getUrl();
    }

    async reloadSession() {
        await browser.reloadSession()
    }
}

const browserInterface = new BrowserInterface();

export {
    browserInterface
}