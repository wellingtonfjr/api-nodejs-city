import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';
import { CitiesProvider } from '../../database/providers';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}
const getAllValidationSchema: yup.Schema<IQueryProps> = yup.object().shape({
	page: yup.number().moreThan(0),
	limit: yup.number().moreThan(0),
	filter: yup.string(),
});

export const getAllValidation = validation({
	query: getAllValidationSchema,
});

export const getAll = async (req: Request<object, object, IQueryProps>, res: Response) => {
	console.log('req.query=>', req.query);
	const result = await CitiesProvider.getAllCities();

	return res.status(StatusCodes.ACCEPTED).send(result);
};
