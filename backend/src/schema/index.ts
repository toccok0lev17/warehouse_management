import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Warehouse {
    id: ID!
    name: String!
    size: Int!
    hazardous: Boolean!
    product_ids: [ID!]!
    created_at: String!
    updated_at: String!
  }

  type Product {
    id: ID!
    name: String!
    size: Int!
    hazardous: Boolean!
    quantity: Int!
    warehouse_id: ID!
    created_at: String!
    updated_at: String!
  }

  type StockMovement {
    id: ID!
    warehouse_id: Int!
    product_id: Int!
    quantity: Int!
    type: String!
    date: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    warehouses: [Warehouse!]!
    products: [Product!]!
    stockMovements: [StockMovement!]!
    warehouseById(id: ID!): Warehouse
    productById(id: ID!): Product
  }

  type Mutation {
    addWarehouse(name: String!, size: Int!, hazardous: Boolean!): Warehouse!
    addProduct(name: String!, size: Int!, warehouse_id: Int!, quantity: Int!, price: Float!, hazardous: Boolean!): Product!
    addStockMovement(warehouse_id: Int!, productId: Int!, quantity: Int!, type: String!, date: String!): StockMovement!
    deleteProduct(id: ID!): ID
    deleteWarehouse(id: ID!): ID
  }
`;

export default typeDefs;
