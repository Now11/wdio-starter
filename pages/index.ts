import { MainPage } from "./test/test.page";

const provider = {
  pages: {
    main: () => new MainPage(),
  },
};

export { provider };
