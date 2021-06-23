export interface IPage<T> {
	root: ((selectorModifier?: string) => Promise<T>) | string;
	name: string;
	index?: number | null;
}
