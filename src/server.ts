// server.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";


import sequelize from "./config/sequelize";
import errorHandler from "./middlewares/error.middleware";
import itemRoutes from './routes/item.route'

const app = express();

app.use(cors());
app.use(bodyParser.json());
sequelize.sync();

const dialect = sequelize.getDialect();
console.log(`Sequelize connected to ${dialect} database!`);

app.use('/items',itemRoutes)
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
