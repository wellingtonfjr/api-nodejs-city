import * as create from './cities';
import * as getAll from './getAll';

export const CitiesProvider = {
	...create,
	...getAll
};