import { IResponse } from "../interfaces/IResponse";
import { IValidator } from "../interfaces/IValidator";
import cardNumber from "./cardNumber";
import email from "./email";
import equalSchema from "./equalSchema";
import moreThan from "./moreThan";
import phone from "./phone";
import range from "./range";
import required from "./required";


export type IRules = Record<string, any>
export type IValidateErrors = Record<string, any>

export class AppValidators {
    static required = required;
    static email = email;
    static phone = phone;
    static range = range;
    static equalSchema = equalSchema;
    static cardNumber = cardNumber;
    static moreThan = moreThan;

    static createValidator(rules: IRules) {
        return new Validator(rules);
    }
}

class Validator {
    public errors: { invalid: boolean, fields: IValidateErrors } = { invalid: false, fields: {} };
    public wasValidated = false;

    constructor(private rules: IRules) { }

    async validate(data: Record<string, any>) {
        this.wasValidated = true;
        const fields = await this.validateTree(this.rules, data);
        this.errors = { invalid: this.hasErrors(fields), fields };
    }

    reset(){
        this.errors = {invalid: false, fields: {}};
    }

    setErrors(errors: IValidateErrors) {
        const invalid = this.hasErrors(errors);
        this.errors = { invalid, fields: errors };
    }

    getErrorsFromResponse(resp: IResponse<any>) {
        if(!resp.errors)
            return;

        const fieldErrors = resp.errors.reduce((acc, err) => {
            if (err.field) {
                const newError = {msg: err.message, details: err};
                acc[err.field] = acc[err.field] ? [...acc[err.field], newError] : [newError];
            }

            return acc;
        }, {} as any);

        this.setErrors(fieldErrors);
    }

    async validateField(key: string, data: Record<string, any>) {
        let fieldErrors = null;

        if (Array.isArray(this.rules[key])) {
            fieldErrors = (await Promise.all(this.rules[key].map((validator: IValidator) => validator(data[key])))).filter(err => err);
        }
        else {
            fieldErrors = await this.validateTree(this.rules[key], data[key]);
        }

        this.errors.fields[key] = this.errors.fields[key] || fieldErrors;
        this.errors.invalid = this.hasErrors(this.errors.fields);
    }

    private async validateTree(rules: IRules, data: Record<string, any>): Promise<IValidateErrors> {
        const errors: IValidateErrors = {};

        for (let key in rules) {
            if (Array.isArray(rules[key]))
                errors[key] = (await Promise.all(rules[key].map((validator: IValidator) => validator(data[key])))).filter(err => err);
        }

        return errors;
    }

    private hasErrors(errors: IValidateErrors): boolean {
        for (let key in errors) {
            if (Array.isArray(errors[key])) {
                if (errors[key].length)
                    return true;
            }
            else if (this.hasErrors(errors[key])) {
                return true;
            }
        }

        return false;
    }
}
