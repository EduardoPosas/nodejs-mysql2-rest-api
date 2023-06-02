import { DataTypes } from "sequelize";
import sequelize from "../db.js";


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    },
    confirmed: {
        type: DataTypes.TINYINT
    }
},
{
    createdAt: false,
    updatedAt: false
});

export default User;

