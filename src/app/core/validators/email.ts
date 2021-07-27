import { IValidator } from "../interfaces/IValidator";

const email: IValidator = async (val) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return val == null || val == '' || re.test(String(val).toLowerCase()) ? null : {msg: 'INVALID_EMAIL'};
};

export default email;
