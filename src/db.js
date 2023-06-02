import { Sequelize } from 'sequelize';

import {
    DB_HOST,
    DB_DATABASE,
    DB_PORT,
    DB_USER,
    DB_PASSWORD
} from './config.js';

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

dbConnection();

export default sequelize;