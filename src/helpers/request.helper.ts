import * as supertest from 'supertest';

type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface IRequestParams {
	url: string;
	path: string;
	method: Methods;
	body?: object;
	headers?: object;
	qeuries?: object;
}

export interface Response<T> {
	responseBody: T;
	statusCode: number;
}

export async function request<T>({ url, path, method, body = {}, headers = {} }: IRequestParams): Promise<Response<T>> {
	let res: supertest.Response;

	const request = supertest(url);
	if (method === 'GET') {
		res = await request.get(path).set(headers);
	}

	if (method === 'POST') {
		res = await request.post(path).send(body).set(headers);
	}

	if (method === 'DELETE') {
		res = await request.get(path).set(headers);
	}

	return {
		responseBody: res.body as T,
		statusCode: res.status,
	};
}
