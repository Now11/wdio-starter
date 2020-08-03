import { BaseFragmen } from "../../../../lib";
import { ButtonElement } from "../../../../lib/elements";

class HeaderFragment extends BaseFragmen {
  signUp: ButtonElement;

  constructor(rootEl, name = HeaderFragment.name) {
    super(rootEl, name);
    this.signUp = this.initChild(ButtonElement, ".sign-up-container li:nth-child(2)", "Signup button");
  }
}
export { HeaderFragment };
