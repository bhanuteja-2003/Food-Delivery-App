import { useContext } from 'react';

import CartIcon from '../Cart/Carticon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

 function HeaderCartButton(props) {
    const cartCtx = useContext(CartContext);
    
    const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
        return currNumber + item.amount;
    }, 0);
    
    const btnClasses = `${classes.button} ${classes.bump}`;

    return (
        
        <button className= {btnClasses} onClick= {props.onClick}>
            <span className= {classes.icon}>
                <CartIcon />
            </span>
            <span>Cart</span>
            <span className= {classes.badge}>{numberOfCartItems} </span>
        </button>
        
    ) 
}

export default HeaderCartButton;
