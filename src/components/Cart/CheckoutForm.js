import classes from './CheckoutForm.module.css';
import { useRef } from 'react';


const CheckoutForm = ({onCancel, onConfirm}) => {
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const phoneInputRef = useRef();
    const addressInputRef = useRef();

    const confirmHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;

        onConfirm({
            name: enteredName,
            email: enteredEmail,
            phone: enteredPhone,
            address: enteredAddress
        });
        // Pass the data from the Checkout component to the Cart component
    };


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label  htmlFor='name'>Name</label>
                <input type='text' id='name' ref={nameInputRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' ref={emailInputRef}  />
            </div>
            <div className={classes.control}>
                <label htmlFor='phone'>Phone Number (ex. 886-012-345-678)</label>
                <input type='text' id='phone' ref={phoneInputRef}  />
            </div>
            <div className={classes.control}>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' ref={addressInputRef}  />
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default CheckoutForm