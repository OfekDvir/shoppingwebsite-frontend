import React from "react";
import { useAuth } from "../components/AuthContext";
import {
    updateCartItemQuantity,
    deleteCartItem,
} from "../api/serverApi";

const CartPage = () => {
    const { cart, updateCart } = useAuth();

    const handleIncrease = async (cartItemId, quantity) => {
        await updateCartItemQuantity(cartItemId, quantity + 1);
        await updateCart();
    };

    const handleDecrease = async (cartItemId, quantity) => {
        if (quantity <= 1) {
            await handleRemove(cartItemId);
        } else {
            await updateCartItemQuantity(cartItemId, quantity - 1);
            await updateCart();
        }
    };

    const handleRemove = async (cartItemId) => {
        await deleteCartItem(cartItemId);
        await updateCart();
    };

    const totalPrice = cart?.cartItem?.reduce(
        (sum, item) => sum + item.product.productPrice * item.quantity,
        0
    ) || 0;

    return (
        <div>
            <h2>🛒 עגלת הקניות שלך</h2>
            {(!cart || cart.cartItem.length === 0) ? (
                <p>העגלה ריקה.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>שם מוצר</th>
                            <th>מחיר</th>
                            <th>כמות</th>
                            <th>סה"כ</th>
                            <th>פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.cartItem.map((item) => (
                            <tr key={item.cartItemId}>
                                <td>{item.product.productName}</td>
                                <td>{item.product.productPrice} ₪</td>
                                <td>{item.quantity}</td>
                                <td>{item.product.productPrice * item.quantity} ₪</td>
                                <td>
                                    <button onClick={() => handleIncrease(item.cartItemId, item.quantity)}>➕</button>
                                    <button onClick={() => handleDecrease(item.cartItemId, item.quantity)}>➖</button>
                                    <button onClick={() => handleRemove(item.cartItemId)}>🗑️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <h3>סה"כ לתשלום: {totalPrice.toFixed(2)} ₪</h3>
        </div>
    );
};

export default CartPage;
