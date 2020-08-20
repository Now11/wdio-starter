import { Element, ElementArray } from "webdriverio";

interface IElement<T> {
  element: T;
  name: string;
}

const wait = {
  element: {
    toBeVisible: async (ctx) => {
      const { element, name }: IElement<Element> = ctx;
      await element.waitForDisplayed({ timeout: 1000, timeoutMsg: `Element ${name} should be visible` });
    },
    toExist: async (ctx) => {
      const { element, name }: IElement<Element> = ctx;
      await element.waitForExist({ timeout: 5000, timeoutMsg: `Element ${name} should exist` });
    },
  },
  list: {
    toNotEmpty: async (ctx) => {
      const { element, name }: IElement<ElementArray> = ctx;
      await browser.waitUntil(
        async () => {
          return element.length > 0;
        },
        { timeout: 5000, interval: 200, timeoutMsg: `${name} elements list is empty` }
      );
    },
    elementToBeVisible: async (ctx, index) => {
      const { element }: IElement<ElementArray> = ctx;
      await element[index].waitForDisplayed({ timeout: 1000, timeoutMsg: `Element with index ${index} should be visible` });
    },
  },
};

export { wait };
