import { Sequelize } from 'sequelize';

const sqlClient = new Sequelize(
  process.env.DATABASE_DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mssql',
    logging: (...msg) => console.log(msg)
  }
);

// (async () => {
//   try {
//     await sqlClient.sync();
//     console.info('sql sync successful');
//   } catch (error) {
//     console.error('sql sync error:', error);
//   }
// })();

export default sqlClient;
