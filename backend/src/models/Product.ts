import { Model, DataTypes, Sequelize } from 'sequelize';
import Warehouse from './Warehouse';

class Product extends Model {
  public id!: number;
  public name!: string;
  public quantity!: number;
  public price!: number;
  public warehouse_id!: number;
  public size!: number;
  public hazardous!: boolean;
  public created_at!: Date;
  public updated_at!: Date;

  public readonly warehouse?: Warehouse;

  static initModel(sequelize: Sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        size: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        hazardous: {
          type: DataTypes.BOOLEAN,
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
        tableName: 'products',
        timestamps: true,
        underscored: true,
      }
    );
  }
}

export default Product;
