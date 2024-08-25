import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
});
function cartReducer(state, action) {
    if (action.type === "ADD_ITEM") {
        // ...UPDATE STATE TO ADD A MEAL ITEM
        state.items.push(action.item);
    }
    if (action.type === "REMOVE_ITEM") {
        //...remove an item
    }
}
export function CartcontextProvider({ children }) {
    //useReducer(cartReducer, { items: [] });
    const existingCartItemIndex = state.items.finIndex(
        (item) => item.id === action.item.id
    );

    return <CartContext.Provider>{children}</CartContext.Provider>;
}
export default CartContext;
