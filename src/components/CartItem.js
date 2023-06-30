import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { IoMdClose, IoMdRemove, IoMdAdd } from 'react-icons/io';

import { CartContext } from '../contexts/CartContext';

const CartItem = ({item}) => {

  const {removeFromCart, increaseAmount, decreaseAmount} = useContext(CartContext)

  const {id, title, image, price, amount} = item;

  return (
    <div className='flex border-b py-2 lg:px-6 gap-x-4 border-gray-200 w-full font-light text-gray-500'>
      <div className='flex items-center w-full min-h-[110px] gap-x-4'>
        <Link to={`/products/${id}`}>
          <img src={image} alt={title} className='max-w-[70px]'/>
        </Link>
        {/*Title and remove icon*/}
        <div className='w-full flex flex-col'>
          <div className='flex justify-between mb-2'>
            <Link to={`/products/${id}`}className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'>{title}</Link>
            <div className='text-xl cursor-pointer' onClick={()=>removeFromCart(id)}>
              <IoMdClose className='text-gray-500 hover:text-red-500 transition'/>
            </div>
          </div>
          <div className='flex gap-x-2 h-[36px] items-center justify-between text-sm'>
            <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium justify-between'>
              <div onClick={()=>decreaseAmount(id)} className='px-2 cursor-pointer h-full flex justify-center items-center'>
                <IoMdRemove /> 
              </div>
              <div>{amount}</div>
              <div onClick={()=>increaseAmount(id)} className='px-2 cursor-pointer h-full flex justify-center items-center'>
                <IoMdAdd />
              </div>
            </div>
            <div>{`$${price}`}</div>
            <div className='text-primary font-medium'>{`$${parseFloat(price * amount).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
