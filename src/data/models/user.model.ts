import * as fake from 'faker';

export class CreateUserModel {
	username: string;
	password: string;
	email: string;

	constructor() {
		this.password = fake.internet.password();
		this.email = fake.internet.email().toLowerCase();
		this.username = fake.internet.userName();
	}

	_password(password: string) {
		this.password = password;
		return this;
	}

	_email(email: string) {
		this.email = email;
		return this;
	}

	_firstName(username: string) {
		this.username = username;
		return this;
	}
}
