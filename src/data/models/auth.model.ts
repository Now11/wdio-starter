import * as fake from 'faker';

export class CreateUserModel {
	userName: string;
	password: string;
	email: string;

	constructor() {
		this.password = fake.internet.password();
		this.email = fake.internet.email();
		this.userName = fake.internet.userName();
	}

	_password(password: string) {
		this.password = password;
		return this;
	}

	_email(email: string) {
		this.email = email;
		return this;
	}

	_firstName(userName: string) {
		this.userName = userName;
		return this;
	}
}
