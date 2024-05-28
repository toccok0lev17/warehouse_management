import { ProductCard } from './ProductCard';

interface ProductListProps {
    products: any;
}
export const ProductList: React.FC<ProductListProps> = ({
    products,
}) => {

    return (
        <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product:any) => (
       <ProductCard product={product}/>
      ))}
    </ul>
    )
}