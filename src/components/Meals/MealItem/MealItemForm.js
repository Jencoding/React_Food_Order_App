import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef, useState } from 'react'

const MealItemForm = ( {id, onAddToCart} ) => {

  const [amountIsValid, setAmountIsValid] = useState(true);

  // Get the amount value
  const amountInputRef = useRef();
 

  const formSubmitHandler = e => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    // .current has value property, which is always a string. Convert it to number:
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 ||   enteredAmountNumber > 5) {
      setAmountIsValid(false);
      return
      };

      onAddToCart(enteredAmountNumber)
  };


    return <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input ref={amountInputRef} label='Amount' input={{ id: 'amount', type: 'number', min: '1', max: '5', step: '1', defaultValue: '1'
      }} />
      <button>Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
}

export default MealItemForm