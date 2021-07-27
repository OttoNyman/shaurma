import { IValidator } from "../interfaces/IValidator";

const range = (min: number, max: number): IValidator => async (val) => {
    return +val >= min && +val <= max ? null : {msg: 'INVALID_RANGE', details: {min, max}};
};

export default range;
