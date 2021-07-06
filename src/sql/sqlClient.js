import { Sequelize } from 'sequelize';
// import badge from './models/badge';
import issuer from './models/issuer';
import news from './models/news';
import opportunity from './models/opportunity';
import participation from './models/participation';
import user from './models/user';

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

// const Badge = sqlClient.define('Badge', badge);
const News = sqlClient.define('News', news);
const Opportunity = sqlClient.define('Opportunity', opportunity);
const Participation = sqlClient.define('Participation', participation);
const User = sqlClient.define('User', user);
const Issuer = sqlClient.define('Issuer', issuer);

Opportunity.belongsToMany(User, { through: Participation, as: 'participants' });
User.belongsToMany(Opportunity, { through: Participation, as: 'opportunities' });

Opportunity.belongsTo(User, { as: 'issuer' });
Issuer.belongsTo(User, { as: 'user' });

export { News, Opportunity, Participation, User, Issuer };

// // sync models
// (async () => {
//   try {
//     await sqlClient.sync();
//     // await sqlClient.sync({ alter: true });
//     // await sqlClient.sync({ alter: true, force: true });
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
