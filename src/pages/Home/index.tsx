import { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const loadProducts = async () => {
  const response = await api.get<Product[]>('/products');
  return response.data;
}


const Home = (): JSX.Element => {
  // const [products, setProducts] = useState<Product[]>([]);
  const { addProduct, cart } = useCart();

  // useEffect(() => {
  //   async function loadProducts() {
  //     const response = await api.get<Product[]>(`/products`);

  //     const data = response.data.map(product => ({
  //       ...product,
  //       priceFormatted: formatPrice(product.price)
  //     }));
  //     setProducts(data);
  //   }

  //   loadProducts();
  // }, []);


  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: loadProducts,
  });

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 list-none'>
    {
      isLoading ? (
        <p>Carregando ....</p>
      ) : (
        <>
          {data?.map((product) => (
            <li className='flex flex-col bg-white rounded-md p-5 ' key={product.id}>
              <img className="self-center w-80 h-80 object-scale-down" src={product.image} alt={product.title} />

              <div className="informations mt-3 flex flex-col gap-3">
                <strong className='text-base text-neutral-600 mt-1 line-clamp-2 h-12'>{product.title}</strong>
                <span className='text-xl text-neutral-700 font-bold mt-1 mb-5'>{formatPrice(product.price)}</span>
              </div>

              <button
                type="button"
                data-testid="add-product-button"
                className='bg-green-800 text-white border-0 rounded-md overflow-hidden mt-auto flex items-center transition-all duration-200 hover:bg-green-900'
                onClick={() => handleAddProduct(product.id)}
              >
                <div data-testid="cart-product-quantity" className='flex items-center p-3 bg-black opacity-70'>
                  <MdAddShoppingCart size={16} color="#FFF" className='mr-1' />
                </div>

                <span className='flex-1 text-center font-bold'>ADICIONAR AO CARRINHO</span>
              </button>
            </li>
          ))}
        </>
      )

    }


      {/* {products.map(product => (
        <li className='flex flex-col bg-white rounded-md p-5 ' key={product.id}>
          <img className="self-center max-w-[250px]" src={product.image} alt={product.title} />
          <strong className='text-base text-gray-800 mt-1'>{product.title}</strong>
          <span className='text-xl font-bold mt-1 mb-5'>{product.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            className='bg-green-500 text-white border-0 rounded-md overflow-hidden mt-auto flex items-center transition-all duration-200 hover:bg-green-600'
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity" className='flex items-center p-3 bg-black opacity-70'>
              <MdAddShoppingCart size={16} color="#FFF" className='mr-1' />
              {cartItemsAmount[product.id] || 0}
            </div>

            <span className='flex-1 text-center font-bold'>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))} */}
    </section>
  );
};

export default Home;
