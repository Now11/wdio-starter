import { Element, ElementArray } from "webdriverio";

interface IElement<T> {
  element: T;
  name: string;
}

const wait = {
  elementForVisible: async (ctx) => {
    const { element, name }: IElement<Element> = ctx;
    await element.waitForDisplayed({ timeout: 1000, timeoutMsg: `Element ${name} should be visible` });

  },
  elementForExist: async (ctx) => {
    const { element, name }: IElement<Element> = ctx;
    await element.waitForExist({ timeout: 5000, timeoutMsg: `Element ${name} should exist` });
  },

  forListToNotEmpty: async (ctx) => {
    const { element, name }: IElement<ElementArray> = ctx;
    await browser.waitUntil(
      async () => {
        return element.length > 0;
      },
      { timeout: 5000, interval: 200, timeoutMsg: `${name} is empty` }
    );

  },
};

export { wait };
