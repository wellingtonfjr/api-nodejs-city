import { RequestHandler } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

type TProperty = 'body'|'query'|'header'|'params';
type TSchemas = Record<TProperty, yup.Schema<any>>

type TValidation = (schemas: Partial<TSchemas>) => RequestHandler

export const validation: TValidation = (schemas) => async (req, res, next) => {
	const errorValidator: Record<string, Record<string, string>> = {};
	Object.entries(schemas).forEach(([key, schema]) => {
		try {
			schema.validateSync(req[key as TProperty], { abortEarly: false });
		} catch (err) {
			const yupError = err as yup.ValidationError;
			const errors: Record<string, string> = {};
			console.log('yupError.inner', yupError.inner);
			yupError.inner.forEach(error => {
				if(!error.path) return;
				errors[error.path] = error.message;
			});
			errorValidator[key] = errors;
		}
	});
	console.log('error', Object.keys(errorValidator));

	if (Object.keys(errorValidator).length) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorValidator });
	return next();
};