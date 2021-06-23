export interface ICustomElement<T> {
	root: () => Promise<T>;
	name: string;
}
