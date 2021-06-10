import { Sequelize } from 'sequelize';
import opportunity from './models/opportunity';
import participant from './models/participant';
import participation from './models/participation';

const sqlClient = new Sequelize(
  process.env.DATABASE_DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mssql',
    logging: () => {}
    // logging: (...msg) => console.log(msg)
  }
);

const Opportunity = sqlClient.define('Opportunity', opportunity);
const Participant = sqlClient.define('Participant', participant);
const Participation = sqlClient.define('Participation', participation);
Opportunity.belongsToMany(Participant, { through: Participation });
Participant.belongsToMany(Opportunity, { through: Participation });

export { Opportunity, Participant };

// // sync models
// (async () => {
//   try {
//     // await sqlClient.sync();
//     await sqlClient.sync({ alter: true });
//     console.info('sql sync successful');
//   } catch (error) {
//     console.error('sql sync error:', error);
//   }
// })();

// // test connection
// (async () => {
//   try {
//     await sqlClient.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

export default sqlClient;
