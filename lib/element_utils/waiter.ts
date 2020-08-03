import { Element } from "webdriverio";

interface IElement {
  element: Element;
  name: string;
}

const wait = {
  forVisible: async (ctx) => {
    const { element, name }: IElement = ctx;
    await element.waitForDisplayed({ timeout: 5000, timeoutMsg: `Element ${name} should be visible` });
  },
  forExist: async (ctx) => {
    const { element, name }: IElement = ctx;
    await element.waitForExist({ timeout: 5000, timeoutMsg: `Element ${name} should exist` });
  },
};

export { wait };
