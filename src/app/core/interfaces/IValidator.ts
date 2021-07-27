export type IValidateError = {msg: string, details?: any};
export type IValidator = (val: any) => Promise<null | IValidateError>;
