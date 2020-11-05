import { BaseFragment, ButtonElement, InputElement, Log } from '../../../../lib';

@Log
class SignInFragment extends BaseFragment {
	emailField: InputElement;
	passwordField: InputElement;
	signInBtn: ButtonElement;
	constructor({ root, name }) {
		super({ root, name });
		this.emailField = this.initChild(InputElement, '[type="email"]', 'Email input field');
		this.passwordField = this.initChild(InputElement, '[type="password"]', 'Password input field');
		this.signInBtn = this.initChild(ButtonElement, '[type="submit"]', 'Sign in button');
	}
}
export { SignInFragment };
