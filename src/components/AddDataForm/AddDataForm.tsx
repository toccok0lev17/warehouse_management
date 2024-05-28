import { useState } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import AddProductForm from './Forms/AddProductForm';
import AddWarehouseForm from './Forms/AddWarehouseForm';
import { useQuery } from '@apollo/client';
import { GET_WAREHOUSES } from '../../apollo/queries/warehouseQueries';

interface AddDataFormProps {
    type: 'Warehouse' | 'Product';
    warehouse?: {
        id: number;
        name: string;
    };
    updateValues?: any
}

export const AddDataForm: React.FC<AddDataFormProps> = ({ type, warehouse, updateValues }) => {
    const [open, setOpen] = useState(false)
    const { loading, error, data, refetch } = useQuery(GET_WAREHOUSES, {
        skip: !!warehouse,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const warehouses = data?.warehouses || [warehouse];
    if (type === "Product" && !warehouses.length) return <p className='text-red-200'>To add prodcuts you need to create Warehouse first!</p>
    
    return (
        <>
            {
                updateValues ?
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className={'block px-3 py-1 text-sm leading-6 text-gray-900'}
                    >
                        Update
                    </button>
                    : <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className="inline-flex mb-12 items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <PlusCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                        Add {type}
                    </button>
            }
            <Transition show={open}>
                <Dialog className="relative z-10" onClose={setOpen}>
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    {
                                        type === "Product" ?
                                            <AddProductForm setOpen={setOpen} warehouses={warehouses} updateValues={updateValues} /> :
                                            <AddWarehouseForm setOpen={setOpen} updateValues={updateValues} />
                                    }
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
