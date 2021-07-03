import { IElement, IElementArray } from './elements.interface';

export interface IWaitContext {
	element: IElement;
	name: string;
}

export interface IWaitContextArray {
	elements: IElementArray;
	name: string;
}
