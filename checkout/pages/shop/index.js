import React, { useState, useEffect } from 'react';
import { ShopCard } from '../../components';
import axios from 'axios';
import './shop.css';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    (async () => {
      const response = await axios.get('/api/items');
      setItems(response.data);
    })();
  }, []);

  const startPayment = async () => {
    setPaymentStatus('loading ...');
    const url = (await axios.post('/api/pay/', {
      data: shoppingCart
    })).data.url;
    window.location.href = url;
  }

  return (
    <div className='container'>
      <h1>Loja</h1>{console.log(shoppingCart)}
      <button onClick={startPayment} className=''>{shoppingCart.length} Items | COMPRAR</button>
      {paymentStatus}
      <div className='shopList'>
        {
          items.length > 0 && items.map(item => {
            return <ShopCard key={item.id} ammount={
              shoppingCart.reduce((sum, cartItem) => {
                if (cartItem.id === item.id) {
                  console.log('equal');
                  console.log('item.ammount', cartItem.ammount);
                  return cartItem.ammount;
                } else return sum;
              }, 0)
            } setShoppingCart={setShoppingCart} item={item} />
          })
        }
      </div>
    </div>
  );
}

export default Shop;