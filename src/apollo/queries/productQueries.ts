import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      price
      quantity
      updated_at
      size
      hazardous
    }
  }
`;

export const ADD_PRODUCT = gql`
    mutation AddProduct($name: String!, $size: Int!, $warehouseId: Int!, $quantity: Int!, $price: Float!, $hazardous: Boolean!) {
        addProduct(name: $name, size: $size, warehouse_id: $warehouseId, quantity: $quantity, price: $price, hazardous: $hazardous) {
        id
        }
    }
`;

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($id: String!, $name: String!, $size: Int!, $warehouseId: Int!, $quantity: Int!, $price: Float!, $hazardous: Boolean!) {
        updateProduct(id: $id, name: $name, size: $size, warehouse_id: $warehouseId, quantity: $quantity, price: $price, hazardous: $hazardous) {
        id
        }
    }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId)
  }
`;