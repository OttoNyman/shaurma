import { IValidator } from "../interfaces/IValidator";

const cardNumber: IValidator = async (val) => {
    const re = /^\d{16}$/;
    return val == null || val == '' || re.test(String(val).replace(/\s/g, '')) ? null : {msg: 'INVALID_CARD_NUMBER'};
};

export default cardNumber;
