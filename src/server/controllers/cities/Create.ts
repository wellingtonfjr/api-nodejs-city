import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { ICity } from '../../database/models';
import { CitiesProvider } from '../../database/providers';

type IBodyProps = Omit<ICity, 'id'>
const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
	name: yup.string().required().min(3).max(150),
});

export const createValidation = validation({
	body: bodyValidation,
});

export const create = async (req: Request<object, object, ICity>, res: Response) => {
	const result = await CitiesProvider.create(req.body);

	if (result instanceof Error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			errors: {
				default: result.message
			}
		});
	}
	return res.status(StatusCodes.ACCEPTED).json(result);
};
