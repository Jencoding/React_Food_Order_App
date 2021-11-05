import React, { useContext, useEffect, useState } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context'
import { Link } from 'react-router-dom'

const HeaderCartButton = ( {onClick} ) => {
  
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  // Here need useState because need to re-evaluate and re-render this component when the animation classes is added conditionally.

  const cartCTX = useContext(CartContext);
  // By using useContext here, the HeaderCartButton component will be re-evaluated by React whenever the context changes.


  const numberOfCartItems = cartCTX.items.reduce((accu, item) => {return accu + item.amount}, 0);
  
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  
  const { items } = cartCTX;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300); // Remove the bump classes after 0.3s so that the button can bump everytime the button is clicked.

    return () => {
      clearTimeout(timer);
    }
  }, [items]);


    return (
    <Link to='/cart'>
      <button className={btnClasses} onClick={onClick}>
          <span className={classes.icon}>
      <CartIcon />
          </span>
          <span>Cart</span>
          <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    </Link>
    )
}

export default HeaderCartButton
