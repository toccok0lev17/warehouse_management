import { EllipsisHorizontalIcon, EyeIcon } from "@heroicons/react/24/outline"
import { classNames } from "../../utils"
import { Link } from "react-router-dom"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react"
import { DELETE_WAREHOUSE } from "../../apollo/queries/warehouseQueries"
import { useMutation } from "@apollo/client"
import { GlobalContext } from "../../App"
import { useContext } from "react"

interface WarehouseCardProps {
  warehouse: any
}
export const WarehouseCard: React.FC<WarehouseCardProps> = ({
  warehouse
}) => {
  const globalContext = useContext(GlobalContext);
  const [deleteWarehouseMutation] = useMutation(DELETE_WAREHOUSE);

  const deleteWarehouse = async (warehouseId: number) => {
    try {
      await deleteWarehouseMutation({ variables: { deleteWarehouseId: warehouseId } });
      GlobalContext && globalContext?.setRefetchWarehouses(true);
    } catch (error) {
      console.error(error)
    }
  };
  console.log(warehouse);

  return (
    <li key={warehouse.id} className="flex justify-between items-center px-4 py-4 sm:px-6">
      <span>{warehouse.name}</span>
      <div className="flex max-lg:flex-col items-center gap-8">
        <div
          className={classNames(
            `${warehouse.hazardous ? "bg-red-50 text-red-700 ring-red-600/20" : "bg-green-50 text-green-700 ring-green-600/20"}`,
            'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
          )}
        >
          {warehouse.hazardous ? "HAZARDOUS" : "NON-HAZARDOUS"}
        </div>
        <div className="flex">
          <span>Size:</span>
          <div
            className={classNames(
              "text-green-700 bg-green-50 ring-green-600/20",
              'rounded-md py-1 mx-2 px-4 text-xs text-center max-w-fit font-medium ring-1 ring-inset'
            )}
          >
            {warehouse.size}
          </div>
        </div>
        <Link
          to={`/warehouse/${warehouse.id}`}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <EyeIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          View Products
        </Link>
        <Menu as="div" className="relative ml-auto">
          <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </MenuButton>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem>
                {({ focus }) => (
                  <a
                    href="#"
                    className={classNames(
                      focus ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900'
                    )}
                  >
                    Update<span className="sr-only">, {warehouse.name}</span>
                  </a>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    onClick={() => deleteWarehouse(warehouse.id)}
                    className={classNames(
                      focus ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-red-600'
                    )}
                  >
                    Delete<span className="sr-only">, {warehouse.name}</span>
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </li>
  )
}