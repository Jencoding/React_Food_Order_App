import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import CheckoutForm from './CheckoutForm'

const Cart = ( {onClose} ) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);


    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const hasItem = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
      cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
      cartCtx.addItem({...item, amount: 1})
    };

    const orderHandler = () => {
      setIsOrdering(true);
    };

    // Submit data to the server
    const submitOrderHandler = async (userData) => {
      setSubmitting(true);

      await fetch('https://food-order-app-a7779-default-rtdb.firebaseio.com/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items
        })
      });

      setSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    };

    // Items in the cart
    const cartItems = (
        <ul className={classes['cart-items']}>{cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)}/>)}</ul>
    );

    // Checkout form
    const cartModalContent = (
      <React.Fragment>
        {cartItems}
         <div className={classes.total}>
           <span>合計</span>
           <span>{totalAmount}</span>
           {isOrdering && <CheckoutForm onCancel={onClose} onConfirm={submitOrderHandler} />}
         </div>
         {!isOrdering && <div className={classes.actions}>
           <button className={classes['button-alt']} onClick={onClose}>Close</button>
           {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
         </div>}
      </React.Fragment>
    );
  
    // Order sending message
    const isSubmittingModalContent = <p>Sending your order request!</p>;

    // Sending order successfully message and display the button to close it
    const didSubmitModalContent = <React.Fragment><p>Successfully sent your order!</p>
    <div className={classes.actions}>
           <button className={classes['button-alt']} onClick={onClose}>Close</button>
           {hasItem && <button className={classes.button} onClick={orderHandler}>Order</button>}
         </div></React.Fragment>

    return (
        <Modal onClose={onClose}>
         {!isSubmitting && !didSubmit && cartModalContent}
         {isSubmitting && isSubmittingModalContent}
         {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart

