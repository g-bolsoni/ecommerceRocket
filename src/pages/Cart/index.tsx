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
        <div className='w-full'>
          <ul className=' grid-cols-5 hidden md:grid'>
            <li className='text-[#999] text-left p-3' aria-label="product image"></li>
            <li className='text-[#999] text-left p-3'>PRODUTO</li>
            <li className='text-[#999] text-left p-3'>QTD</li>
            <li className='text-[#999] text-left p-3 '>SUBTOTAL</li>
            <li className='text-[#999] text-left p-3' aria-label="delete icon"></li>
          </ul>
        </div>
        <div className='w-full'>
          {cartFormatted.map(product => (
            <ul data-testid="product" className='relative grid grid-cols-1 md:grid-cols-5 border-b-2 border-gray-500' key={product.id}>
              <li className='p-3 flex items-center justify-center'>
                <img className='w-40 h-40 object-scale-down' src={product.image} alt={product.title} />
              </li>
              <li className='p-3 flex items-center md:items-start justify-center flex-col'>
                <strong className='text-zinc-400 block'>{product.title}</strong>
                <span className='block mt-1 text-lg font-bold'>{product.priceFormatted}</span>
              </li>
              <li className='p-3 flex items-center justify-center md:justify-start'>
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
                    className='outline outline-1 outline-gray-500 rounded p-2 w-[50px] text-center'
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
              </li>
              <li className='hidden md:flex p-3 items-center justify-start'>
                <strong className='text-zinc-400 block'>{product.subTotal}</strong>
              </li>
              <li className='p-3 flex items-center justify-start'>
                <button
                  type="button"
                  data-testid="remove-product"
                  className='absolute top-5 right-3 md:relative md:top-0 md:right-0 '
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </li>
            </ul>
          ))}
        </div>
      </div>

      <footer className='mt-7 flex flex-col-reverse md:flex-row gap-3 md:gap-0 justify-between items-center'>
        <button type="button" className='w-full md:w-max bg-green-500 text-white border-0 rounded px-5 py-3 font-bold uppercase transition-all duration-200 hover:bg-green-600'>Finalizar pedido</button>

        <div className='flex items-baseline'>
          <span className='text-zinc-800 font-bold'>TOTAL</span>
          <strong className='text-2xl ml-2'>{total}</strong>
        </div>
      </footer>
    </section>
  );
};

export default Cart;
