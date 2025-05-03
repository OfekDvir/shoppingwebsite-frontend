import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import {
    getCartById,
    updateCartItemQuantity,
    deleteCartItem,
} from "../api/serverApi";
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const { cart, currentUser } = useAuth();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [order, setOrder] = useState(null);

    const fetchCart = async () => {
        try {
            const cartId = cart?.cartId;
            if (!cartId) return;

            const response = await getCartById(cartId);
            const items = response.cartItem || [];

            if (response.order) {
                setOrder(response.order)
            }
            console.log("פריטים מהשרת אחרי מחיקה:", items);

            setCartItems([]);
            setTimeout(() => {
                setCartItems(items.map((item) => ({ ...item })));
            }, 0);

            const total = items.reduce(
                (sum, item) => sum + item.product.productPrice * item.quantity,
                0
            );
            setTotalPrice(total);
        } catch (error) {
            console.error("שגיאה בקבלת פרטי העגלה:", error);
        }
    };

    const handleIncrease = async (item) => {
        try {
            const cartId = cart?.cartId;
            await updateCartItemQuantity(cartId, {
                cartItemId: item.cartItemId,
                product: { productId: item.product.productId },
                quantity: item.quantity + 1,
            });
            await fetchCart();
        } catch (error) {
            console.error("שגיאה בהוספת כמות:", error);
        }
    };

    const handleDecrease = async (item) => {
        try {
            const cartId = cart?.cartId;
            if (item.quantity > 1) {
                await updateCartItemQuantity(cartId, {
                    cartItemId: item.cartItemId,
                    product: { productId: item.product.productId },
                    quantity: item.quantity - 1,
                });
            } else {
                await handleRemove(item.cartItemId);
            }
            await fetchCart();
        } catch (error) {
            console.error("שגיאה בהפחתת כמות:", error);
        }
    };

    const handleRemove = async (cartItemId) => {
        try {
            const cartId = cart?.cartId;
            await deleteCartItem(cartId, cartItemId);
            await fetchCart();
            console.log("המוצר הוסר בהצלחה!");
        } catch (error) {
            console.error("שגיאה בהסרת מוצר:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [currentUser]);

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>🛒 עגלת הקניות שלך</h2>
                <h3>סה"כ לתשלום: ₪{totalPrice.toFixed(2)}</h3>
            </div>
            {order && <h3>{order.status}</h3>}
            {cartItems.length === 0 ? (
                <p>העגלה ריקה.</p>
            ) : (
                <>
                    <table className="cart-table">
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
                            {cartItems.map((item) => (
                                <tr key={`${item.cartItemId}-${item.product.productId}`}>
                                    <td>{item.product.productName}</td>
                                    <td>{item.product.productPrice} ₪</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.product.productPrice * item.quantity} ₪</td>
                                    <td className="cart-actions">
                                        <button onClick={() => handleIncrease(item)}>➕</button>
                                        <button onClick={() => handleDecrease(item)}>➖</button>
                                        <button className="remove-btn" onClick={() => handleRemove(item.cartItemId)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="checkout-btn" onClick={() => navigate('/checkout')}>מעבר לתשלום</button>
                </>
            )}
        </div>
    );
};

export default CartPage;