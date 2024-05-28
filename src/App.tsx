import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Warehouses from './pages/Warehouses';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import WarehouseDetails from './pages/WarehouseDetails';
import Products from './pages/Products';
import { createContext, useState } from 'react';

export interface GlobalContextType {
  heroTitle: string,
  setHeroTitle: React.Dispatch<React.SetStateAction<string>>;
  refetchProducts: boolean;
  setRefetchProducts: React.Dispatch<React.SetStateAction<boolean>>;
  refetchWarehouses: boolean;
  setRefetchWarehouses: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);

const App = () => {
  const [refetchProducts, setRefetchProducts] = useState(false);
  const [refetchWarehouses, setRefetchWarehouses] = useState(false);
  const [heroTitle, setHeroTitle] = useState("Home");

  return (
    <ApolloProvider client={client}>
      <GlobalContext.Provider value={{
        heroTitle,
        setHeroTitle,
        refetchProducts,
        setRefetchProducts,
        refetchWarehouses,
        setRefetchWarehouses
      }}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/warehouses" element={<Warehouses />} />
              <Route path="/warehouse/:id" element={<WarehouseDetails />} />
            </Routes>
          </Layout>
        </Router>
      </GlobalContext.Provider>
    </ApolloProvider>
  );
}

export default App;
