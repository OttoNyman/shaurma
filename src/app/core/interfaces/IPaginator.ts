import { IPaginatorBase } from "./IPaginatorBase";

export interface IPaginator<T> extends IPaginatorBase{
    responseList: Array<T>
}
