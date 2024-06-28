// import important parts of sequelize library
const { Model, DataTypes, DECIMAL, INTEGER, STRING } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: STRING,
      allowNull: false
    },
    price: {
      type: DECIMAL,
      allowNull: false,
      //validate decimal
      validate: {
        isDecimal: true,
      }
    },
    stock:{
      type: INTEGER,
      allowNull: false,
      defaultValue: 10,
      //valildate number
      validate: {
        isNumberic: true,
      }
    },
    category_id: {
      type: INTEGER,

    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
