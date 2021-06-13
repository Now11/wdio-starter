import { BasePage, Log, Input, Button } from '../../../lib';
import { IUser } from '../../data';

@Log
class AuthPage extends BasePage {
	nameField: Input;
	surname: Input;
	genderDdl: Button;
	birthdate: Input;
	email: Input;
	password: Input;
	retryPassword: Input;
	phone: Input;
	statusDdl: Button;
	ddlOptions: Button;
	submitButton: Button;

	constructor() {
		super({ root: 'body', name: 'Main Page' });
		this.nameField = this.initChild(Input, 'input[name="name"]', 'Name field');
		this.surname = this.initChild(Input, 'input[name="surname"]', 'Surname field');
		this.genderDdl = this.initChild(Button, 'div.selectStyles__control', 'Gender drop down menu', { index: 0 });
		this.birthdate = this.initChild(Input, 'input[name="birthdate"]', 'Birth date field');
		this.email = this.initChild(Input, 'input[name="email"]', 'Email field');
		this.password = this.initChild(Input, 'input[name="password"]', 'Password field');
		this.retryPassword = this.initChild(Input, 'input[name="retypePassword"]', 'Retry password field');
		this.phone = this.initChild(Input, 'input[name="phone"]', 'Phone field');
		this.statusDdl = this.initChild(Button, 'div.selectStyles__control', 'Status drop down menu', { index: 1 });
		this.ddlOptions = this.initChild(Button, 'div.selectStyles__option=TEXT_TO_REPLACE', 'Drop down list options');
		this.submitButton = this.initChild(Button, 'button[type="submit"]', 'Submit button');
	}

	async login({ email, password }: { email: string; password: string }) {
		await this.email.sendKeys(email);
		await this.password.sendKeys(password);
	}

	async register(user: IUser) {
		await this.nameField.sendKeys(user.name);
		await this.surname.sendKeys(user.surname);
		await this.selectGender(user.gender);
		await this.birthdate.sendKeys(user.birthDate);
		await this.email.sendKeys(user.email);
		await this.password.sendKeys(user.password);
		await this.retryPassword.sendKeys(user.password);
		await this.phone.sendKeys(user.phone);

		await this.selectStatus(user.status);

		await this.submitButton.click();
	}

	private async selectGender(gender: string) {
		await this.genderDdl.click();
		await this.ddlOptions.clickByText(gender);
	}

	private async selectStatus(status: string) {
		await this.statusDdl.click();
		await this.ddlOptions.clickByText(status);
	}
}

export { AuthPage };
