import { useQuery } from '@apollo/client';
import { WarehouseList } from '../components/WarehouseList/WarehouseList';
import { GET_WAREHOUSES } from '../apollo/queries/warehouseQueries';
import { AddDataForm } from '../components/AddDataForm/AddDataForm';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../App';

const Warehouses = () => {
  const { loading, error, data, refetch } = useQuery(GET_WAREHOUSES);
  const globalContext = useContext(GlobalContext);
  globalContext?.setHeroTitle("Warehouses");

  useEffect(() => {
    if (globalContext?.refetchWarehouses) {
      refetch();
      globalContext.setRefetchWarehouses(false);
    }
  }, [globalContext?.refetchWarehouses]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <AddDataForm type={"Warehouse"} />
      {data.warehouses && data.warehouses.length > 0 ? (
        <div className="bg-white shadow sm:rounded-md">
          <WarehouseList warehouses={data.warehouses} />
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow sm:rounded-md p-12 flex gap-4 items-center">
          <p className="inline">There are no warehouses. Please add warehouse from the button above.</p>
          <ArrowUpCircleIcon className='h-5 w-5' />
        </div>
      )}
    </>
  );
};

export default Warehouses;
