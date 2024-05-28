import { WarehouseCard } from "./WarehouseCard"

interface WarehouseListProps {
    warehouses: any
}
export const WarehouseList: React.FC<WarehouseListProps> = ({
    warehouses
}) => {
    return (
        <ul role="list" className="divide-y divide-gray-200">
            {warehouses.map((warehouse: any) => (
             <WarehouseCard warehouse={warehouse}/>
        ))}
      </ul>
    )
}