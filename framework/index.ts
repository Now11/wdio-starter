import { MainPage } from "./pages";
import { browserInterface } from "../lib";

const provider = {
  pages: {
    main: () => new MainPage(),
  },
  get _browser() {
    return browserInterface
  }
};

export { provider };
