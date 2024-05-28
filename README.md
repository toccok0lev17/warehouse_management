# Project Title

Welcome to the Project! This repository contains the backend and frontend for our application.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js
- npm
- PostgreSQL (or your preferred database)

### Installation

1. **Login to your database and import the database schema:**

   ```sql
   \i <PATH_TO_SCHEMA.SQL_PROVIDED>

2. **Copy the example environment variables file and update it:**
    cp .env.example .env
    Add the necessary variables using the .env.example template.

3. **Backend Setup:**
    Navigate to the backend directory and install the dependencies:
    cd ./backend
    npm install
    npm run dev
4. **Frontend Setup:**
    Open a new terminal in the root directory and run:
    npm install
    npm run start
5. **Running the Application**
    You can now open the GraphQL Explorer at: http://localhost:4000/graphql
    The frontend application will be available at: http://localhost:3000

6. **Usage:**
    Navigate to the Warehouse Page:
        Add a new warehouse.
        Add products to the warehouse.