import CartContext from './cart-context'
import { useReducer } from 'react'

const defaultCartState = {
    items: [],
    totalAmount: 0
}


const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        // The state in this code block is state, rather than cartState.
       const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

       const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

       const existingCartItem = state.items[existingCartItemIndex];
       // existingCartItem is an object.

       let updatedItems;

       // If an item is already part of the cart items array:
       if (existingCartItem) {
           const updatedItem = {
               ...existingCartItem,
               amount: existingCartItem.amount + action.item.amount
           } // Here is creating a new object
          
           updatedItems = [...state.items]; // Creating a new array from copying the existing items array without mutating it.

           updatedItems[existingCartItemIndex] = updatedItem; // Picking old item which is identified in the cart items array, and make it follow the form of the new created object above. 把新的item更新至items array裡。

       } else {
        // If an item isn't part of the cart items array:
           updatedItems = state.items.concat(action.item);
       }

       return {
           items: updatedItems,
           totalAmount: updatedTotalAmount
       }
    }


    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);

       const existingCartItem = state.items[existingCartItemIndex];

       const updatedTotalAmount = state.totalAmount - existingCartItem.price;

       let updatedItems;

       if (existingCartItem.amount === 1) {
          updatedItems = state.items.filter(item => item.id !== action.id)

       } else {
         const updatedItem = {...existingCartItem, amount: existingCartItem.amount - 1};

         updatedItems = [...state.items];

         updatedItems[existingCartItemIndex] = updatedItem;
       }

       return {
           items: updatedItems,
           totalAmount: updatedTotalAmount
       }
    };

    if (action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;
}


const CartProvider = ( {children} ) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)


    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item})
        // It's up to you what an action is, usually it's an object. Here is fowarding this object to the reducer function(cartReducer).
    };

    const removeItemToCartHandler = id => {
        dispatchCartAction({type: 'REMOVE', id: id})
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'})
    };

    const cartContext = {
        // Because the useReducer is added, so the state now become cartState.
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clearCart: clearCartHandler
    };
    // This object will be the concrete context value that will be updated over time. It's dynamic.


    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartProvider

// This component is to manage the current context and provide that context to all components that want access to it.
