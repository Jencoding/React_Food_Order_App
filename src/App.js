import React, { useState } from 'react'
import Header from './components/Layout/Header'
import AvailableMeals from './components/Meals/AvailableMeals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true)
  };

  const hideCartHandler = () => {
    setCartIsShown(false)
  };
  

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
      <AvailableMeals />
      </main>
    </CartProvider>
  );
}

export default App;
