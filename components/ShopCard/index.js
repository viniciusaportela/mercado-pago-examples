import React from 'react';
import './shopcard.css';

const ShopCard = Props => {
  const addItem = ev => {
    //ev.target.
    Props.setShoppingCart(cart => {
      let newArr = [];
      let hasItem;

      //Check if has item in cart
      newArr = cart.map(cartItem => {
        if (cartItem.id === Props.item.id) {
          let ammount = cartItem.ammount + 1;
          hasItem = true;
          return { ...cartItem, ammount };
        } return cartItem;
      });

      if (hasItem) {
        return newArr;
      } else {
        return [...cart, { ...Props.item, ammount: 1 }]
      }
    });
  }

  return (
    <div className='shopCard'>
      {console.log(Props.ammount)}
      <span className='shopCardTitle'>{Props.item.title} (x{Props.ammount})</span>
      <span className='shopCardPrice'>{Props.item.price},00</span>
      <button onClick={addItem} className='shopCardButton'>ADICIONAR</button>
    </div>
  );
}

export default ShopCard;