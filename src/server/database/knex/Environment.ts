import { Knex } from 'knex';
import path from 'path';

export const development: Knex.Config = {
	client: 'sqlite3',
	useNullAsDefault: true,
	connection: {
		filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
	},
	migrations: {
		directory: path.resolve(__dirname, '..', 'migrations'),
	},
	seeds: {
		directory: path.resolve(__dirname, '..', 'seeds'),
	},
	pool: {
		// eslint-disable-next-line @typescript-eslint/ban-types
		afterCreate: (connection: any, done: Function) => {
			connection.run('PRAGMA foreign_keys = ON');
			done();
		}
	}
};

export const production = {};