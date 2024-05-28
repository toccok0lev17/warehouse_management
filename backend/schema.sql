-- Create the database
CREATE DATABASE warehouse_management;

-- Connect to the database
\c warehouse_management;

-- Enable the use of timestamp columns with default values
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create warehouses table
CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size INTEGER NOT NULL,
    hazardous BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create products table with a warehouse_id foreign key
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    warehouse_id INTEGER NOT NULL,
    hazardous BOOLEAN NOT NULL DEFAULT FALSE,
    size INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses (id) ON DELETE CASCADE
);

-- Create stock_movements table
CREATE TABLE stock_movements (
    id SERIAL PRIMARY KEY,
    warehouse_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL,
    date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

-- Create a trigger function to update the updated_at field on updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Attach the trigger function to the tables
CREATE TRIGGER update_warehouses_updated_at BEFORE UPDATE
ON warehouses FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE
ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_stock_movements_updated_at BEFORE UPDATE
ON stock_movements FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Create a trigger function to check warehouse existence before inserting a product
CREATE OR REPLACE FUNCTION check_warehouse_existence()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM warehouses) = 0 THEN
        RAISE EXCEPTION 'You need to create a warehouse first';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Attach the trigger function to the products table before insert
CREATE TRIGGER check_warehouse_existence_before_insert
BEFORE INSERT ON products
FOR EACH ROW EXECUTE PROCEDURE check_warehouse_existence();
