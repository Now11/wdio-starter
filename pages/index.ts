import { MainPage } from "./main.page";

const provider = {
  pages: {
    main: () => new MainPage(),
  },
};

export { provider };
