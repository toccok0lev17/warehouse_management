import { classNames, timestampToDate } from '../../utils';
import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../App';
import { DELETE_PRODUCT } from '../../apollo/queries/productQueries';
import { AddDataForm } from '../AddDataForm/AddDataForm';

interface ProductCardProps {
  product: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {
  const globalContext = useContext(GlobalContext);
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);
  const [update, setUpdate] = useState(false);
  const deleteProduct = async (productId: number) => {
    try {
      await deleteProductMutation({ variables: { deleteProductId: productId } });
      globalContext && globalContext.setRefetchProducts(true);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <li key={product.id} className="overflow-hidden rounded-xl border border-gray-200">
        <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
          <div className="text-sm font-medium leading-6 text-gray-900">{product.name}</div>
          <div className='flex items-center gap-2'>
            <AddDataForm type={"Product"} updateValues={product} />
            <button
              onClick={() => deleteProduct(product.id)}
              className='block px-3 py-1 text-sm leading-6 text-red-600'
            >
              Delete<span className="sr-only">, {product.name}</span>
              </button>
          </div>
        </div>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-gray-200">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Type</dt>
            <dd className="flex items-start gap-x-2">
              <div
                className={classNames(
                  `${product.hazardous ? "bg-red-50 text-red-700 ring-red-600/20" : "bg-green-50 text-green-700 ring-green-600/20"}`,
                  'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {product.hazardous ? "HAZARDOUS" : "NON-HAZARDOUS"}
              </div>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Size</dt>
            <dd className="text-gray-700">
              <time dateTime={product.updated_at}>{product.size}</time>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Quantity</dt>
            <dd className="text-gray-700">
              <time dateTime={product.updated_at}>{product.quantity} pcs.</time>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Last Updated</dt>
            <dd className="text-gray-700">
              <time dateTime={product.updated_at}>{timestampToDate(product.updated_at)}</time>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Price</dt>
            <dd className="flex items-start gap-x-2">
              <div className="font-medium text-gray-900">€ {product.price}</div>
              <div
                className={classNames(
                  "text-green-700 bg-green-50 ring-green-600/20",
                  'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                )}
              >
                gross
              </div>
            </dd>
          </div>
        </dl>
      </li>
    </>

  )
}