import * as fake from 'faker';

interface UserModel {
	firstName: string;
	lastName: string;
	password: string;
	email: string;
}

class CreateUserModel implements UserModel {
	firstName: string;
	lastName: string;
	password: string;
	email: string;

	constructor() {
		this.password = fake.internet.password();
		this.email = fake.internet.email();
		this.firstName = fake.name.firstName();
		this.lastName = fake.name.lastName();
	}

	_password(password: string) {
		this.password = password;
		return this;
	}

	_email(email: string) {
		this.email = email;
		return this;
	}

	_firstName(firstName: string) {
		this.firstName = firstName;
		return this;
	}

	_lastName(lastName: string) {
		this.lastName = lastName;
		return this;
	}
}

const user = new CreateUserModel();
console.log(user);
