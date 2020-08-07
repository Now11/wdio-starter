import { MainPage } from "./pages";

const provider = {
  pages: {
    main: () => new MainPage(),
  },
};

export { provider };
