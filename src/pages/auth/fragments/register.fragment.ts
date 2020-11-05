import { BaseFragment, ButtonElement, InputElement, Log } from '../../../../lib';

@Log
class RegisterFragment extends BaseFragment {
	emailField: InputElement;
	passwordField: InputElement;
	signUpBtn: ButtonElement;
	usernameField: InputElement;
	constructor({ root, name }) {
		super({ root, name });
		this.emailField = this.initChild(InputElement, '[type="email"]', 'Email input field');
		this.passwordField = this.initChild(InputElement, '[type="password"]', 'Password input field');
		this.signUpBtn = this.initChild(ButtonElement, '[type="submit"]', 'Sign in button');
		this.usernameField = this.initChild(InputElement, '[type="text"]', 'Username input field');
	}
}
export { RegisterFragment };
