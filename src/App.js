import React, { useState } from 'react'
import Header from './components/Layout/Header'
import AvailableMeals from './components/Meals/AvailableMeals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'
import { Route } from 'react-router-dom'


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
      <Route path='/cart' exact>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      </Route>
      <Header onShowCart={showCartHandler} />
      <main>
      <AvailableMeals />
      </main>
    </CartProvider>
  );
}

export default App;
