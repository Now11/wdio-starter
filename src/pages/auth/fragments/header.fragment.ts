import { BaseFragment, ButtonElement, Log } from '../../../../lib';

@Log
class HeaderNavFragment extends BaseFragment {
	toHome: ButtonElement;
	toSignIn: ButtonElement;
	toSignUp: ButtonElement;
	constructor({ root, name }) {
		super({ root, name });
		this.toHome = this.initChild(ButtonElement, '[ui-sref="app.home"]', 'Home button');
		this.toSignIn = this.initChild(ButtonElement, '[ui-sref="app.login"', 'Sign in button');
		this.toSignUp = this.initChild(ButtonElement, '[ui-sref="app.register"', 'Sign up button');
	}
}
export { HeaderNavFragment };
