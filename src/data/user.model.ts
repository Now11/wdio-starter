import { IGender, IStatus } from '../common/types';

export interface IUser {
	password?: string;
	email?: string;
	gender?: IGender;
	status?: IStatus;
	phone?: string;
	name?: string;
	surname?: string;
	birthDate?: string;
}

export class UserModel {
	password: string;
	email: string;
	gender: IGender;
	status: IStatus;
	phone: string;
	surname: string;
	name: string;
	birthDate: string;

	constructor({ password, email, gender, status, phone, name, surname, birthDate }: IUser) {
		this.password = password ?? '';
		this.email = email ?? '';
		this.gender = gender;
		this.status = status;
		this.phone = phone;
		this.name = name ?? '';
		this.surname = surname ?? '';
		this.birthDate = birthDate ?? '';
	}
}
