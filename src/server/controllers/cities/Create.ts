import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';

interface IQuery {
	filter: string,
}

const queryValidation: yup.Schema<IQuery> = yup.object().shape({
	filter: yup.string().required()
});

interface ICity {
  name: string
	city: string
}
const bodyValidation: yup.Schema<ICity> = yup.object().shape({
	name: yup.string().required().min(3),
	city: yup.string().required().min(3)
});

export const createValidation = validation({
	query: queryValidation,
	body: bodyValidation,
});

export const create = async (req: Request<object, object, ICity>, res: Response) => {
	console.log('req.body=>', req.query);

	res.status(StatusCodes.ACCEPTED).json({
		city: {
			...req.body
		}
	});
};
