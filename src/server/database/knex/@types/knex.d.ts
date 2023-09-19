import { ICity } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    cities: ICity
    // person: IPerson
    // user: IUser
  }
}