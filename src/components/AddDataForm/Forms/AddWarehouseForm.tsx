import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { ADD_WAREHOUSE, GET_WAREHOUSES } from '../../../apollo/queries/warehouseQueries';
import { classNames, getErrorMessage } from '../../../utils';

const initialValues = {
  name: "",
  size: "",
  hazardous: false
};

const AddWarehouseForm = ({
  setOpen,
  updateValues
}: {
  setOpen: any
  updateValues?: any;
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [enabled, setEnabled] = useState(false); // State for the switch
  const [errorMessage, setErrorMessage] = useState(''); // State for the error message
  const [addWarehouse] = useMutation(ADD_WAREHOUSE, {
    refetchQueries: [{ query: GET_WAREHOUSES }]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages

    addWarehouse({
      variables: {
        ...formData,
        size: parseInt(formData.size),
        hazardous: enabled // Include hazardous field
      }
    })
      .then(() => {
        setFormData(initialValues);
        setEnabled(false); // Reset the switch
        setOpen(false);
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error);
        setErrorMessage(errorMessage); // Set the error message
      });
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Warehouse Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Warehouse Name" required />
      </div>
      <div className="mb-5">
        <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
        <input type="number" id="size" name="size" value={formData.size} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Size" required />
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
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  );
};

export default AddWarehouseForm;
