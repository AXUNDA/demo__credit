import * as path from 'path';

// import knex,{Knex} from 'knex';



const  config: any = {
  development: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port : 3306,

      user: 'root',
      password: 'dondizzy12',
      database: 'lensqr',
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
      // tableName: "knex_migrations", 
    },
  },
};
// const db = knex(config.development)

export default config



