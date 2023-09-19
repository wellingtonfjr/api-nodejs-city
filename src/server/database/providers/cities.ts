import { ETableNames } from '../ETableNames';
import { Knex } from '../knex';
import { ICity } from '../models';

export const create = async (city: Omit<ICity, 'id'>): Promise<number | Error> => {
	try {
		const [ result ] = await Knex(ETableNames.city).insert(city);
		return result as number || new Error('Erro ao inserir Cidade');
	} catch (error) {
		return new Error('Erro ao inserir Cidade');
	}
};
