import { MainPage } from "./pages";
import { browserInterface } from "../lib";

const shared = {
  pages: {
    main: () => new MainPage(),
  },
  get _browser() {
    return browserInterface
  }
};

export { shared };
