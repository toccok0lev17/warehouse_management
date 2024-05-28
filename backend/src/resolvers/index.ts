import Warehouse from "../models/Warehouse";
import Product from "../models/Product";
import StockMovement from "../models/StockMovement";
import { AddWarehouseInput, AddProductInput, AddMovementInput } from "../types/graphql";
import axios from 'axios';

const resolvers = {
  Query: {
    warehouses: async () => await Warehouse.findAll({ include: [{ model: Product, as: 'products' }] }),
    products: async () => await Product.findAll({ include: [{ model: Warehouse, as: 'warehouse' }] }),
    stockMovements: async () => await StockMovement.findAll(),
    warehouseById: async (_: unknown, { id }: { id: number }) => {
      return await Warehouse.findByPk(id, { include: [{ model: Product, as: 'products' }] });
    },
    productById: async (_: unknown, { id }: { id: number }) => {
      return await Product.findByPk(id, { include: [{ model: Warehouse, as: 'warehouse' }] });
    },
  },
  Mutation: {
    addWarehouse: async (_: unknown, { name, size, hazardous }: AddWarehouseInput) => {
      const warehouse = await Warehouse.create({ name, size, hazardous });
      return warehouse;
    },
    deleteWarehouse: async (_: unknown, { id }: { id: number }) => {
      try {
        const warehouse = await Warehouse.findByPk(id);
        if (!warehouse) {
          throw new Error('Warehouse not found');
        }

        await warehouse.destroy();

        return id;
      } catch (error) {
        throw new Error('Failed to delete product');
      }
    },
    addProduct: async (_: unknown, { name, quantity, price, warehouse_id, size, hazardous }: AddProductInput ) => {

      const warehouse = await Warehouse.findByPk(warehouse_id);
      if (!warehouse) {
        throw new Error('Warehouse not found');
      }

      if (warehouse.hazardous !== hazardous) {
        throw new Error(`The product must be of type ${warehouse.hazardous ? "HAZARDOUS" : "NON-HAZARDOUS"}`);
      }

      const product = await Product.create({ name, quantity, price, warehouse_id, size, hazardous });
      return product;
    },
    updateProduct: async (_: unknown, { id, name, quantity, warehouse_id, price, size, hazardous }: AddProductInput) => {
      try {
        const product = await Product.findByPk(id);
        if (!product) {
          throw new Error('Product not found');
        }
    
        const warehouse = await Warehouse.findByPk(warehouse_id);
        if (!warehouse) {
          throw new Error('Warehouse not found');
        }
    
        if (warehouse.hazardous !== hazardous) {
          throw new Error(`The product must be of type ${warehouse.hazardous ? "HAZARDOUS" : "NON-HAZARDOUS"}`);
        }
    
        product.name = name;
        product.quantity = quantity;
        product.price = price;
        product.size = size;
        product.hazardous = hazardous;
        product.warehouse_id = warehouse_id;

    
        await product.save();
    
        return product;
      } catch (error: any) {
        throw new Error(error.message || 'Failed to update product!');
      }
    },
    deleteProduct: async (_: unknown, { id }: { id: number }) => {
      try {
        const product = await Product.findByPk(id);
        if (!product) {
          throw new Error('Product not found');
        }

        await product.destroy();

        return id;
      } catch (error) {
        throw new Error('Failed to delete product');
      }
    },
    addStockMovement: async (_: unknown, { input }: { input: AddMovementInput }) => {
      const { warehouse_id, product_id, quantity, type, date } = input;

      const warehouse = await Warehouse.findByPk(warehouse_id);
      if (!warehouse) throw new Error('Warehouse not found');

      const product = await Product.findByPk(product_id);
      if (!product) throw new Error('Product not found');

      const currentStockMovements = await StockMovement.findAll({ where: { warehouse_id, product_id } });
      const currentStock = currentStockMovements.reduce((total, movement) => {
        return movement.type === 'import' ? total + movement.quantity : total - movement.quantity;
      }, 0);

      try {
        const response = await axios.post('http://localhost:5000/calculate', {
          warehouseSize: warehouse.size,
          currentStock,
          movementType: type,
          quantity,
        });

        const { newStock, remainingSpace } = response.data;

        if (newStock < 0) throw new Error('Stock cannot be negative');
        if (newStock > warehouse.size) throw new Error('Exceeds warehouse capacity');

        const stockMovement = await StockMovement.create({ warehouse_id, product_id, quantity, type, date });
        return stockMovement;
      } catch (error) {
        throw new Error('Error in stock calculation');
      }
    },
  },
  Warehouse: {
    products: async (warehouse: Warehouse) => {
      return await Product.findAll({ where: { warehouse_id: warehouse.id } });
    }
  }
};

export default resolvers;
