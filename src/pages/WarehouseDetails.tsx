import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ProductList } from '../components/ProductList/ProductList';
import { GET_WAREHOUSE } from '../apollo/queries/warehouseQueries';
import { AddDataForm } from '../components/AddDataForm/AddDataForm';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../App';

const WarehouseDetails = () => {
  const { id } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_WAREHOUSE, {
    variables: { id },
  });
  const globalContext = useContext(GlobalContext);
  globalContext?.setHeroTitle(data?.warehouseById?.name);
  
  useEffect(() => {
    if (globalContext?.refetchProducts) {
      refetch();
      globalContext.setRefetchProducts(false);
    }
  }, [globalContext?.refetchProducts]);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  const products = data.warehouseById.products;
  return (
    <>
      <AddDataForm type={"Product"} warehouse={{
          id: data.warehouseById.id,
          name: data.warehouseById.name
        }}/>
      {products && products.length > 0 ? (
        <ProductList products={products}/>
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-md p-12 flex gap-4 items-center">
          <p className="inline">There are no products. Please add product from the button above.</p>
          <ArrowUpCircleIcon className='h-5 w-5' />
        </div>
      )}
    </>
  );
};

export default WarehouseDetails;
