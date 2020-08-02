interface IElementDisplay {
  root: WebdriverIO.Element;
  name: string;
}

const waiter = {
  waitForVisible: (ctx) => {
    const { root, name }: IElementDisplay = ctx;
    root.waitForDisplayed({ timeout: 5000 });
  },
};

export { waiter };
