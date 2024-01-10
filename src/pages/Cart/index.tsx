import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map(product => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.amount)
  }))
  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        return sumTotal + product.price * product.amount;
      }, 0)
    )
  
  function handleProductIncrement(product: Product) {
      updateProductAmount({productId: product.id, amount: product.amount + 1});
  }

  function handleProductDecrement(product: Product) {
    updateProductAmount({productId: product.id, amount: product.amount - 1});
    
  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId)
  }

  return (
    <section className='p-7 bg-white rounded'>
      <div className='w-full'>
        <thead>
          <tr>
            <th className='text-[#999] text-left p-3' aria-label="product image" />
            <th className='text-[#999] text-left p-3'>PRODUTO</th>
            <th className='text-[#999] text-left p-3'>QTD</th>
            <th className='text-[#999] text-left p-3'>SUBTOTAL</th>
            <th className='text-[#999] text-left p-3' aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cartFormatted.map(product => (
            <tr data-testid="product" key={product.id}>
              <td className='p-3 border-b-2  border-gray-500'>
                <img className='h-full' src={product.image} alt={product.title} />
              </td>
              <td className='p-3 border-b-2  border-gray-500'>
                <strong className='text-zinc-400 block'>{product.title}</strong>
                <span className='block mt-1 text-lg font-bold'>{product.priceFormatted}</span>
              </td>
              <td className='p-3 border-b-2  border-gray-500'>
                <div className='flex items-center'>
                  <button
                    type="button"
                    data-testid="decrement-product"
                    className='bg-none border-0 p-2'
                    disabled={product.amount <= 1}
                    onClick={() => handleProductDecrement(product)}
                  >
                    <MdRemoveCircleOutline size={20} className='text-purple-500 transition-colors duration-200 hover:text-purple-600 disabled:text-[#7159c1] disabled:cursor-not-allowed' />
                  </button> 
                  <input
                    className='outline outline-1 outline-gray-500 rounded p-2 w-[50px]'
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={product.amount}
                  />
                  <button
                    type="button"
                    className='bg-none border-0 p-2'
                    data-testid="increment-product"
                    onClick={() => handleProductIncrement(product)}
                  >
                    <MdAddCircleOutline size={20}  className='text-purple-500 transition-colors duration-200 hover:text-purple-600 disabled:text-[#7159c1] disabled:cursor-not-allowed' />
                  </button>
                </div>
              </td>
              <td className='p-3 border-b-2  border-gray-500'>
                <strong className='text-zinc-400 block'>{product.subTotal}</strong>
              </td>
              <td className='p-3 border-b-2  border-gray-500'>
                <button
                  type="button"
                  data-testid="remove-product"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>

      <footer className='mt-7 flex justify-between items-center'>
        <button type="button" className='bg-purple-500 text-white border-0 rounded px-5 py-3 font-bold uppercase transition-all duration-200 hover:bg-purple-600'>Finalizar pedido</button>

        <div className='flex items-baseline'>
          <span className='text-zinc-800 font-bold'>TOTAL</span>
          <strong className='text-2xl ml-2'>{total}</strong>
        </div>
      </footer>
    </section>
  );
};

export default Cart;
