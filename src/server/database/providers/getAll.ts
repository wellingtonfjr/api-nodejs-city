import { ETableNames } from '../ETableNames';
import { Knex } from '../knex';
import { ICity } from '../models';

export const getAllCities = async (): Promise<ICity[] | Error> => {
	try {
		const result = await Knex.select('*').from(ETableNames.city);

		console.log('result=>', result);
		return result;
	} catch (error) {
		return new Error('Erro ao pesquisar Cidade');
	}
};