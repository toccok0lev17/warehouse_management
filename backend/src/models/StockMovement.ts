import { Model, DataTypes, Sequelize } from 'sequelize';
import Warehouse from './Warehouse';
import Product from './Product';

class StockMovement extends Model {
  public id!: number;
  public warehouse_id!: number;
  public product_id!: number;
  public quantity!: number;
  public type!: string;
  public date!: Date;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly warehouse?: Warehouse;
  public readonly product?: Product;

  static initModel(sequelize: Sequelize) {
    StockMovement.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        warehouse_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'stock_movements',
        timestamps: true,
        underscored: true,
      }
    );
  }
}

export default StockMovement;
