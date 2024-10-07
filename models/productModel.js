import { DataTypes, NOW, Sequelize } from "sequelize";
import { sequelize } from "./db.js";

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,

    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    isDeleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    productViewed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },


}, {
    tableName: 'product',
    paranoid: true,
    timestamps: true,
    createdAt: 'createdDate',
    deletedAt: 'deletedDate',
    updatedAt: 'updatedDate'
})