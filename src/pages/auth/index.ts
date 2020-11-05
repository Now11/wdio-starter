import { BasePage, Log } from '../../../lib';
import { HeaderNavFragment, RegisterFragment, SignInFragment } from './fragments';

@Log
class AuthPage extends BasePage {
	registerForm: RegisterFragment;
	signInForm: SignInFragment;
	headerNav: HeaderNavFragment;
	constructor() {
		super('body', 'Main Page');
		this.registerForm = this.initChild(RegisterFragment, '.auth-page', 'Register form');
		this.signInForm = this.initChild(SignInFragment, '.auth-page', 'SigIn form');
		this.headerNav = this.initChild(HeaderNavFragment, 'nav.navbar.navbar-light', 'Navigation bar');
	}

	async login({ email, password }: { email: string; password: string }) {
		await this.signInForm.emailField.sendKeys(email);
		await this.signInForm.passwordField.sendKeys(password);
		await this.signInForm.signInBtn.click();
	}

	async register({ userName, email, password }: { userName: string; email: string; password: string }) {
		await this.registerForm.usernameField.sendKeys(userName);
		await this.registerForm.emailField.sendKeys(email);
		await this.registerForm.passwordField.sendKeys(password);
		await this.registerForm.signUpBtn.click();
	}
}
export { AuthPage };
