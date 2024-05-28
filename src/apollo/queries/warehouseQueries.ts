import { gql } from "@apollo/client";


export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      id
      name
      size
      hazardous
    }
  }
`;

export const GET_WAREHOUSE = gql`
  query GetWarehouseDetails($id: ID!) {
    warehouseById(id: $id) {
        id
        name
        size
        hazardous
        updated_at
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
  }
`;

export const ADD_WAREHOUSE = gql`
  mutation AddWarehouse($name: String!, $size: Int!, $hazardous: Boolean!) {
    addWarehouse(name: $name, size: $size, hazardous: $hazardous) {
      id
      name
      size
      hazardous
    }
  }
`;

export const DELETE_WAREHOUSE = gql`
mutation DeleteWarehouse($deleteWarehouseId: ID!) {
  deleteWarehouse(id: $deleteWarehouseId)
}
`;