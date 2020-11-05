import * as supertest from 'supertest';

interface IRequestParams {
	url: string;
	path: string;
	method: string;
	body?: object;
	headers?: object;
	qeuries?: object;
}

export interface Response<T> {
	responseBody: T;
	statusCode: number;
}

export async function request<T>({ url, path, method, body, headers }: IRequestParams): Promise<Response<T>> {
	let res: supertest.Response;
	const request = supertest(url);
	if (method === 'GET') {
		res = await request.get(path).set(headers);
	} else if (method === 'POST') {
		res = await request.post(path).send(body).set(headers);
	}

	return {
		responseBody: res.body as T,
		statusCode: res.status,
	};
}
