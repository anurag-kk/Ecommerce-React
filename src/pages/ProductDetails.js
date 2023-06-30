import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';

import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';

const ProductDetails = () => {
  const {id} = useParams();
  const {products}  = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);

  const product = products.find((item)=>{
    return item.id === parseInt(id);
  })

  const {title, price, description, image} = product

  return (
    <section className='pt-32 pb-12 lg:py-32 items-center'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[150px] lg:max-w-sm' src={image} alt={title} />
          </div>
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[18px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{title}</h1>
            <div className='text-xl text-red-500 font-medium mb-6'>$ {price}</div>
            <p className='mb-6 text-[14px] lg:text-[16px]'>{description}</p>
            <button className='bg-primary py-2 lg:py-4 px-8 text-white' onClick={()=>{addToCart(product)}}>Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
