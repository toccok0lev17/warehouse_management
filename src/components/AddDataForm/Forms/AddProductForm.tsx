import { useMutation } from '@apollo/client';
import { Fragment, useCallback, useContext, useState } from 'react';
import { Switch, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ADD_PRODUCT, UPDATE_PRODUCT } from '../../../apollo/queries/productQueries';
import { classNames, getErrorMessage } from '../../../utils';
import { GlobalContext } from '../../../App';

const AddProductForm = ({
  setOpen,
  warehouses,
  defaultValues,
  updateValues
}: {
  setOpen: any;
  warehouses?: { id: number, name: string }[];
  defaultValues?: any
  updateValues?: any;
}) => {
  const initialValues = updateValues || {
    name: '',
    size: '',
    warehouseId: '',
    quantity: '',
    price: '',
    hazardous: false
  };
  const globalContext = useContext(GlobalContext);
  const [formData, setFormData] = useState(initialValues);
  const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses ? warehouses[0] : { id: '', name: 'Select a warehouse' });
  const [enabled, setEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const formDataWithNumbers = {
      ...formData,
      size: parseInt(formData.size),
      warehouseId: Number(selectedWarehouse.id),
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      hazardous: enabled
    };
    const mutationVariables = updateValues ? { ...formDataWithNumbers, id: updateValues.id } : formDataWithNumbers;
    const mutationFunction = updateValues ? updateProduct : addProduct;

    mutationFunction({ variables: mutationVariables })
      .then(() => {
        setFormData(initialValues);
        globalContext && globalContext.setRefetchProducts(true);
        setEnabled(false);
        setOpen(false);
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        setErrorMessage(errorMessage);
      });
  }, [formData, enabled, globalContext, initialValues, setOpen, updateProduct, addProduct, updateValues]);

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Name" required />
      </div>
      <div className="mb-5">
        <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
        <input type="number" id="size" name="size" value={formData.size} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Size" required />
      </div>
      <div className="mb-5">
        <Listbox value={selectedWarehouse} onChange={setSelectedWarehouse}>
          {({ open }) => (
            <>
              <Listbox.Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Warehouse</Listbox.Label>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                  <span className="block truncate">{selectedWarehouse.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {warehouses?.map((warehouse) => (
                      <Listbox.Option key={warehouse.id} value={warehouse} className={({ active }) => classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9')}>
                        {({ selected, active }) => (
                          <>
                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                              {warehouse.name}
                            </span>
                            {selected ? (
                              <span className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
      <div className="mb-5">
        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
        <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Quantity" required />
      </div>
      <div className="mb-5">
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" required />
      </div>
      <div className="mb-5 flex items-center">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={classNames(
            enabled ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
        <label htmlFor="hazardous" className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Hazardous</label>
      </div>
      {errorMessage && (
        <div className="mb-5 text-red-500 text-sm">
          {errorMessage}
        </div>
      )}
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue
-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  );
};

export default AddProductForm;
