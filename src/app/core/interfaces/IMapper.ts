export interface IMapper<T>{
    fromObject(data: any): T;
}
