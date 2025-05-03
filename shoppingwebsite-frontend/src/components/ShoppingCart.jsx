// ShoppingCart.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

const ShoppingCart = () => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            if (user) {
                const res = await axios.get(`/api/carts/${user.userId}`);
                setCartItems(res.data.cartItems);
            }
        };
        loadCart();
    }, [user]);

    if (!user) return <div>יש להתחבר כדי לראות את העגלה שלך</div>;

    return (
        <div className="shopping-cart">
            <h3>🛍️ העגלה שלך</h3>
            {cartItems.length === 0 ? (
                <p>אין מוצרים בעגלה.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            {item.product.productName} - כמות: {item.quantity}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShoppingCart;
