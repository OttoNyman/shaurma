import { IValidator } from "../interfaces/IValidator";

const moreThan = (more: number): IValidator => async (val) => {
    return +val > more ? null : {msg: 'INVALID_MORE', details: {more}};
};

export default moreThan;
