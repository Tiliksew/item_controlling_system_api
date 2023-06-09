// sequelize.ts
import { Sequelize } from 'sequelize';

console.log('the user',process.env.DB_USER);
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST as string,
    dialect: 'mysql',
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Connected to MySQL!'))
  .catch((error: Error) => console.error(`Error connecting to MySQL: ${error.message}`));

export default sequelize;
