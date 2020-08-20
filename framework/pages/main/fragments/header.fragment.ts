import { BaseFragment, ButtonElement } from "../../../../lib";

class HeaderFragment extends BaseFragment {
  loginBtn: ButtonElement;

  constructor({ root, name }) {
    super({ root, name });
    this.loginBtn = this.initChild(ButtonElement, "a.btn-menu2", "Login button");
  }

  async clickLoginBtn() {
    await this.loginBtn.click();
  }
}
export { HeaderFragment };
