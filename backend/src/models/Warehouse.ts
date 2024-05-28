import { Model, DataTypes, Sequelize } from 'sequelize';
import Product from './Product';

class Warehouse extends Model {
  public id!: number;
  public name!: string;
  public size!: number;
  public hazardous!: boolean;
  public product_ids!: string[];
  public created_at!: Date;
  public updated_at!: Date;

  public readonly products?: Product[];

  static initModel(sequelize: Sequelize) {
    Warehouse.init(
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
        tableName: 'warehouses',
        timestamps: true,
        underscored: true,
      }
    );
  }
}

export default Warehouse;
