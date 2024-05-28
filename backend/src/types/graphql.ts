export interface AddWarehouseInput {
  name: string;
  size: number;
  hazardous: boolean;
}

export interface AddProductInput {
  id: string;
  name: string;
  quantity: number;
  price: number;
  warehouse_id: number;
  size: number;
  hazardous: boolean;
}

export interface AddMovementInput {
  warehouse_id: number;
  product_id: number;
  quantity: number;
  type: string;
  date: string;
}

export interface Warehouse {
  id: number;
  name: string;
  size: number;
  hazardous: boolean;
  products?: Product[];
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  warehouse_id: number;
  size: number;
  hazardous: boolean;
  created_at: string;
  updated_at: string;
}

export interface StockMovement {
  id: number;
  warehouse_id: number;
  product_id: number;
  quantity: number;
  type: string;
  date: string;
  created_at: string;
  updated_at: string;
}
