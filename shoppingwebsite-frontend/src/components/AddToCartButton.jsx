import React from "react";
import { useAuth } from "../components/AuthContext";
import { addToCart } from "../api/serverApi";

const AddToCartButton = ({ productId, fetchCart }) => {
    const { cart, updateCart, currentUser } = useAuth();

    const handleAddToCart = async () => {
        if (!currentUser) {
            alert("🛒 רק משתמשים מחוברים יכולים להוסיף לעגלה");
            return;
        }

        const cartId = cart?.cartId;
        if (!cartId || !productId) {
            alert("⚠️ בעיה במזהה עגלה או מוצר");
            return;
        }

        try {
            await addToCart(cartId, productId);
            alert("✅ המוצר התווסף לעגלה");
            updateCart();
            // רענון עגלה אם שלחו לי פוקנציה
            if (fetchCart) fetchCart();
        } catch (error) {
            console.error("❌ שגיאה בהוספה לעגלה:", error);
            alert("שגיאה בעת ההוספה לעגלה");
        }
    };

    return (
        <button onClick={handleAddToCart}>
            🛒 הוסף לעגלה
        </button>
    );
};

export default AddToCartButton;