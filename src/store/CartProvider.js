import { useReducer } from 'react';


import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)

        const existingCartItem = state.items[existingCartItemIndex]

        let updateditems

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updateditems = [...state.items]
            updateditems[existingCartItemIndex] = updatedItem
        } else {
            updateditems = state.items.concat(action.item)
        }

        return {
            items: updateditems,
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const existingCartItem = state.items[existingCartItemIndex]

        const updatedTotalAmount = state.totalAmount - existingCartItem.price

        let updateItems


        if (existingCartItem.amount === 1) {
            updateItems = state.items.filter(item => item.id !== action.id)
        } else {
            const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
            updateItems = [...state.items]
            updateItems[existingCartItemIndex] = updatedItem

        }

        return {
            items: updateItems,
            totalAmount: updatedTotalAmount
        }


    }
    if (action.type === 'CLEAR') {
        return defaultCartState
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };

    const clerCartHandler = () => {

        dispatchCartAction({ type: 'CLEAR' })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clerCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;