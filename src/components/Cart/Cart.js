import { useContext, useState } from "react"

import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartItem from "./CartItem"
import Checkout from "./Checkout"

const Cart = (props) => {

    const cartCtx = useContext(CartContext)
    const [isCheckout, setIsCheckout] = useState(false)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)

    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })

    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const submitOrderHandler = (userData) => {

        fetch('https://react-practice-a92c2-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })




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

    return (
        <Modal onCloseCart={props.onCloseCart} >
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
            <div className={classes.actions} >
                {!isCheckout && <button onClick={props.onCloseCart} className={classes['button--alt']}>Close</button>}
                {hasItems && !isCheckout && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>

        </Modal>
    )
}

export default Cart