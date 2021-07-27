import {IRules} from '.';
import {IValidator} from '../interfaces/IValidator';

const equalSchema = (schema: IRules, msgFn: () => string): IValidator => {
	return async (val: Record<string, any>) => {
		//no error if value not passed
		if (!val)
			return null;

		//check schema
		for (let key in schema) {
			//check rules array
			if (Array.isArray(schema[key])) {
				const errors = (await Promise.all(schema[key]
					.map((rule: IValidator) => rule(val[key]))))
					.filter(v => v);

				if (errors.length)
					return {msg: msgFn()};
			} else {
				//check nested schema
				const error = await equalSchema(schema[key], msgFn)(schema[key]);

				if (error)
					return error;
			}
		}

		return null;
	}
};

export default equalSchema;
