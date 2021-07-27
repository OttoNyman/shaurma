import { ResponseStatus } from "../constants/ResponseStatus";
import { IError } from "./IError";

export interface IResponse<T>{
    data: T,
    errors: Array<IError>,
    status: ResponseStatus
}
