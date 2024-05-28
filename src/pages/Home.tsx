import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../apollo/queries/productQueries';
import { useContext } from 'react';
import { GlobalContext } from '../App';

const Home = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const globalContext = useContext(GlobalContext);
  globalContext?.setHeroTitle("Home");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {/* TO DO */}
    </div>
  );
};

export default Home;
