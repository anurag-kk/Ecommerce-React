import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({children}) => {

  const [cart, setCart] = useState([])

  const [itemAmount,setItemAmount] = useState(0)

  const [total, setTotal] = useState(0)

  useEffect(()=>{
    const finalPrice = cart.reduce((accumulator, currentItem)=>{
      return accumulator + (currentItem.amount * currentItem.price);
    },0)
    setTotal(finalPrice)
  },[cart])

  useEffect(()=>{
    if(cart){
      const amount = cart.reduce((accumulator, currentItem)=>{
        return accumulator + currentItem.amount;
      },0);
      setItemAmount(amount);
    }
  },[cart])

  const addToCart = (product) => {
    const newItem = {...product, amount: 1}

    const cartItem = cart.find(item => item.id === product.id);
    
    if(cartItem) {
      const newCart = [...cart].map((item)=>{
        if(item.id === cartItem.id) {
          return { ...item,amount: cartItem.amount + 1}
        }
        else{
          return item;
        }
      })
      setCart(newCart);
    }
    else{
      setCart([...cart,newItem])
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item)=>item.id !== id);
    setCart(newCart)
  }

  const clearCart = () => {
    setCart([]);
  }

  const increaseAmount = (id) => {
    const newCart = cart.map((item)=>{
      if(item.id === id){
        return {...item, amount: item.amount + 1}
      }
      else{
        return item;
      }
    });
    setCart(newCart);
  }

  const decreaseAmount = (id) => {
    const item = cart.find(item => {
      return item.id === id;
    })
    if(item.amount === 1){
      removeFromCart(id);
    }
    else{
      const newCart = cart.map((item)=>{
        if(id === item.id){
          return {...item,amount: item.amount - 1}
        }
        else{
          return item;
        }
      })
      setCart(newCart)
    }
  }


  return <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount, itemAmount, total}}>{children}</CartContext.Provider>;
};

export default CartProvider;
