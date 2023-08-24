import * as path from 'path';
import   db_config from '../config/db_config';
import dotenv from "dotenv"







const  config: any = {
  development: {
    client: 'mysql2',
    connection: {
      host: db_config.host,
      port :db_config.port,

      user: db_config.db_user,
      password: db_config.password,
      database: db_config.db,
    },
    migrations: {
      directory: path.join(__dirname, 'migrations'),
     
    },
  },
};


export default config



