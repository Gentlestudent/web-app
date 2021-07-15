import { Sequelize } from 'sequelize';
import badge from './models/badge';
import issuer from './models/issuer';
import news from './models/news';
import opportunity from './models/opportunity';
import participation from './models/participation';
import user from './models/user';
import assertion from './models/assertion';

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

const Badge = sqlClient.define('Badge', badge);
const News = sqlClient.define('News', news);
const Opportunity = sqlClient.define('Opportunity', opportunity);
const Participation = sqlClient.define('Participation', participation);
const User = sqlClient.define('User', user);
const Issuer = sqlClient.define('Issuer', issuer);
const Assertion = sqlClient.define('Assertion', assertion);

Opportunity.belongsToMany(User, { through: Participation, as: 'participants' });
User.belongsToMany(Opportunity, { through: Participation, as: 'opportunities' });

Opportunity.belongsTo(Issuer, { as: 'issuer' });
Opportunity.belongsTo(Badge, { as: 'badge' });
Issuer.belongsTo(User, { as: 'user' });
Badge.belongsTo(Issuer, { as: 'issuer' });

Assertion.belongsTo(User, { as: 'recipient' });
Assertion.belongsTo(Badge, { as: 'badge' });

export {
  News,
  Opportunity,
  Participation,
  User,
  Issuer,
  Badge,
  Assertion
};

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
