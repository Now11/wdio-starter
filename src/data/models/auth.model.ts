import * as fake from 'faker';
import { rndNumber } from '../../helpers';
export class CreateUserModel {
	username: string;
	password: string;
	email: string;

	constructor() {
		this.password = fake.internet.password();
		this.email = fake.internet.email(fake.random.uuid()).toLowerCase();
		this.username = fake.internet.userName(rndNumber().toString());
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
