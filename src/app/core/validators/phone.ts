import { IValidator } from "../interfaces/IValidator";

const phone: IValidator = async (val) => {
    const re = /^0\d{9}$/;
    return val == null || val == '' || re.test(String(val)) ? null : {msg: 'INVALID_PHONE'};
};

export default phone;
