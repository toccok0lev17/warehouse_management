import { useQuery } from '@apollo/client';
import { ProductList } from '../components/ProductList/ProductList';
import { useContext, useEffect } from 'react'; // Added useEffect
import { GlobalContext } from '../App';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { GET_PRODUCTS } from '../apollo/queries/productQueries';
import { AddDataForm } from '../components/AddDataForm/AddDataForm';

const Products = () => {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const globalContext = useContext(GlobalContext);
  globalContext?.setHeroTitle("Products");
  
  useEffect(() => {
    if (globalContext?.refetchProducts) {
      refetch();
      globalContext.setRefetchProducts(false);
    }
  }, [globalContext?.refetchProducts]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  
  return (
    <>
      <AddDataForm type={"Product"}/>
      {data.products && data.products.length > 0 ? (
        <ProductList products={data.products} />
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-md p-12 flex gap-4 items-center">
        <p className="inline">There are no products. Please add product from the button above.</p>
        <ArrowUpCircleIcon className='h-5 w-5'/>
        </div>
      )}
    </>
  );
  
};

export default Products;
