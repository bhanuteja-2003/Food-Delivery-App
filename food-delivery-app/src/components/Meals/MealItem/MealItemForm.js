import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

 function MealItemForm(props) {
    const [amountisValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        props.onAddToCart(1);

    }
    return (
        <form className= {classes.form} onSubmit={submitHandler}>
           
            <button>+ Add</button>
            {!amountisValid && <p>Please enter a valid amount (0+)</p>}
        </form>
    )
}

export default MealItemForm;
