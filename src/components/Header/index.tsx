import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import logo from '../../assets/images/logo.svg';
import { useCart } from '../../hooks/useCart';

const Header = (): JSX.Element => {
  const { cart } = useCart();
  const cartSize = cart.length;

  return (
    <header className=' w-full flex justify-between items-center h-20 mb-12 px-4'>
      <Link to="/" className='transition-opacity duration-200 hover:opacity-70'>
        <img src={logo} alt="Rocketshoes" />
      </Link>

      <Link to="/cart" className='flex items-center no-underline'>
        <div className='text-left mr-3'>
          <strong className='block text-white'>Meu carrinho</strong>
          <span className='text-xs text-zinc-700' data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`} 
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Link>
    </header>
  );
};

export default Header;
