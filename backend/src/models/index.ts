import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import Warehouse from './Warehouse';
import Product from './Product';
import StockMovement from './StockMovement';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASS!, {
  host: process.env.DB_HOST!,
  dialect: 'postgres'
});

// Initialize models
Warehouse.initModel(sequelize);
Product.initModel(sequelize);
StockMovement.initModel(sequelize);

// Set up associations
Warehouse.hasMany(Product, {
  foreignKey: 'warehouse_id',
  as: 'products',
});
Product.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  as: 'warehouse',
});

StockMovement.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  as: 'warehouse',
});
StockMovement.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});

export { sequelize, Warehouse, Product, StockMovement };
