import { IValidator } from "../interfaces/IValidator";

const required: IValidator = async (val) => {
    return val ? null : {msg: 'INVALID_REQUIRED'};
};

export default required;
