import { Link } from 'react-router-dom';
import { MdClose, MdMenu, MdOutlinePerson, MdOutlineShoppingBag, MdSearch } from 'react-icons/md';

import logo from '../../assets/images/logo.png';
import { useState } from 'react';
import { api } from '../../services/api';
import { useQuery } from '@tanstack/react-query';


const getCategories = async () => {
  const response = await api.get('products/categories');
  return response.data;
}

const Header = () => {
  const [showCategory, setShowCategory] = useState(false);

  function handleToggleCategory() {
    setShowCategory(!showCategory);
  }

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return (

    <header className='bg-transparent w-full flex justify-between items-center h-20 px-4'>
      <Link to="/" className='transition-opacity duration-200 hover:opacity-70'>
        <img src={logo} alt="Rocketshoes"  />
      </Link>

      {/* Lista de produto */}
      <div className={`categories flex flex-col h-full w-full pt-20 fixed top-0 transition-all duration-500 bg-white z-20 pl-4 gap-0 ${showCategory ? 'left-0' : '-left-full'} md:relative md:flex-row md:left-0 md:pt-0 md:bg-transparent md:justify-center md:items-center md:gap-6 md:p-1 `}>
        <div className={`close_categories absolute top-10 right-5 md:hidden ${showCategory ? 'block' : 'hidden'} `} onClick={() => handleToggleCategory()}>
          <MdClose size={24} color="#000" />
        </div>

        {
          isLoading ? (
            <>
              <Link to="/" className='w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1'>
                Masculino
              </Link>
              <Link to="/" className='w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1'>
                Feminino
              </Link>
              <Link to="/" className='w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1'>
                Infantil
              </Link>
              <Link to="/" className='w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1'>
                Casual
              </Link>
              <Link to="/" className='w-max transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1'>
                Social
              </Link>
            </>
          ) : (
            <>
              {data.map((category: string, index: number) => (
                <Link  key={index} to={`/category/${category}`} className='w-max capitalize transition-all duration-200 border-primary-500 hover:border-b text-[#212121] text-base p-1'>
                {category}
                </Link>
              ))}
            </>
          )
        }
      </div>

      <div className="icons flex gap-6">
        <Link to="/" className='transition-opacity duration-200'>
          <MdSearch size={24} color="#000" />
        </Link>
        <Link to="/" className='transition-opacity duration-200 hover:opacity-70 hidden md:block'>
          <MdOutlinePerson size={24} color="#000" />
        </Link>
        <Link to="/cart" className='transition-opacity duration-200 hover:opacity-70'>
          <MdOutlineShoppingBag size={24} color="#000" />
        </Link>
        <button className='transition-opacity duration-200 hover:opacity-70 block md:hidden z-10' onClick={() => handleToggleCategory()}>
          <MdMenu size={24} color="#000" />
        </button>
      </div>
    </header>
  );
};

export default Header;