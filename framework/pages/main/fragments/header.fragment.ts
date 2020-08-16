import { BaseFragment, ButtonElement, Log } from "../../../../lib";
@Log
class HeaderFragment extends BaseFragment {
  loginBtn: ButtonElement;

  constructor({ root, name, isChildArr }) {
    super({ root, name, isChildArr });
    this.loginBtn = this.initChild(ButtonElement, "a.btn-menu2", "Login button");
  }

  async clickLoginBtn() {
    await this.loginBtn.click();
  }
}
export { HeaderFragment };
