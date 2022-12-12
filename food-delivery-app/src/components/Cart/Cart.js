import { Fragment, useContext, useState } from 'react';

import classes from './Cart.module.css';

import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';


function Cart(props) {

    const [showCheckout, setShowCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}`;
    const cartHasItems = cartCtx.items.length > 0; //checks if cart has any items

    const cartItemRemoveHandler = id => {
		cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
		cartCtx.addItem({...item, amount: 1});
    }

    const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
    );

	const orderHandler = () => {
		setShowCheckout(true);
	}

	const submitOrderHandler = (userData) => {
		setIsSubmitting(true);
		fetch('https://food-order-40bae-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
			method: 'POST',
			body: JSON.stringify({
				user: userData,
				orderedItems: cartCtx.items
			})
		});
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	//component that includes ORDER and CANCEL BUTTONS
	const modalActions = (
		<div className={classes.actions}>
		<button className={classes["button--alt"]} onClick={props.onClose}>
			Close
		</button>
		
		{cartHasItems && (
			<button className={classes.button} onClick={orderHandler}>
			Order
			</button>
		)}
		</div>
	);

	const submittingModalContent = <Fragment>
		<p>Placing your order..</p>
	</Fragment>

	const didSubmitModalContent = (
		<Fragment>
			<p>Your order has been placed!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</Fragment>);

	const modalContent = (
		<Fragment>
			{cartItems}
				
			<div className= {classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>

			{showCheckout && <CheckoutForm onConfirm={submitOrderHandler} onClose= {props.onClose}/> }	

			{!showCheckout && modalActions}
		</Fragment>);
    
    return (
        <Modal onClose= {props.onClose}>
            {isSubmitting && !didSubmit && submittingModalContent}
			{!isSubmitting && !didSubmit && modalContent}
			{didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;
