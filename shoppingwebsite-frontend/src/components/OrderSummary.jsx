import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { getCartByUsersId as getCartByUserId } from "../api/serverApi";
import "../App.css";

const OrderSummary = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        zip: "",
        country: ""
    });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await getCartByUserId(currentUser.userId);
                setCart(res);
            } catch (err) {
                console.error("שגיאה בטעינת העגלה", err);
            }
        };

        if (currentUser?.userId) {
            fetchCart();
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConfirm = () => {
        const orderToSave = {
            cart,
            shippingInfo,
            orderDate: new Date(),
            status: "DOONE"
        };

        localStorage.setItem("lastOrder", JSON.stringify(orderToSave));
        alert("ההזמנה נשלחה בהצלחה!");
        navigate("/orders");
    };

    if (!cart) return <p>טוען עגלה...</p>;

    return (
        <div className="order-summary">
            <h2>🛒 סיכום הזמנה</h2>

            <div className="cart-items">
                {cart.cartItem.map(item => (
                    <div key={item.cartItemId}>
                        {item.product.productName} × {item.quantity} — ₪{item.product.productPrice}
                    </div>
                ))}
                <p><strong>סה"כ לתשלום: ₪{cart.totalPrice}</strong></p>
            </div>

            <h3>📦 פרטי משלוח</h3>
            <div className="shipping-form">
                <input name="address" placeholder="כתובת" value={shippingInfo.address} onChange={handleChange} />
                <input name="city" placeholder="עיר" value={shippingInfo.city} onChange={handleChange} />
                <input name="zip" placeholder="מיקוד" value={shippingInfo.zip} onChange={handleChange} />
                <input name="country" placeholder="מדינה" value={shippingInfo.country} onChange={handleChange} />
            </div>

            <button onClick={handleConfirm}>✔️ אשר והמשך לתשלום</button>
        </div>
    );
};

export default OrderSummary;

// import React, { useState, useEffect } from "react";
// import { useAuth } from "./AuthContext";
// import { useNavigate } from "react-router-dom";
// import { getCartByUsersId as getCartByUserId } from "../api/serverApi";
// import "../App.css";

// const OrderSummary = () => {
//     const { currentUser } = useAuth();
//     const navigate = useNavigate();
//     const [cart, setCart] = useState(null);
//     const [shippingInfo, setShippingInfo] = useState({
//         address: "",
//         city: "",
//         zip: "",
//         country: ""
//     });

//     useEffect(() => {
//         const fetchCart = async () => {
//             try {
//                 const res = await getCartByUserId(currentUser.userId);
//                 setCart(res);
//             } catch (err) {
//                 console.error("שגיאה בטעינת העגלה", err);
//             }
//         };

//         if (currentUser?.userId) {
//             fetchCart();
//         }
//     }, [currentUser]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setShippingInfo((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleConfirm = async () => {
//         try {
//             // שלב 1: צור את ההזמנה
//             const response = await fetch("/api/orders", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     userId: currentUser.userId,
//                     cart: cart,
//                     shippingInfo: shippingInfo
//                 })
//             });

//             if (!response.ok) {
//                 alert("שגיאה ביצירת ההזמנה");
//                 return;
//             }

//             const order = await response.json();

//             // שלב 2: אשר את ההזמנה (שנה ל־DOONE)
//             const confirmRes = await fetch(`/api/orders/${order.id}/confirm`, {
//                 method: "PUT"
//             });

//             if (!confirmRes.ok) {
//                 alert("שגיאה באישור ההזמנה");
//                 return;
//             }

//             alert("✔️ ההזמנה הושלמה בהצלחה!");
//             navigate("/orders");

//         } catch (err) {
//             console.error("שגיאה בתהליך השליחה:", err);
//         }
//     };

//     if (!cart) return <p>טוען עגלה...</p>;

//     return (
//         <div className="order-summary">
//             <h2>🛒 סיכום הזמנה</h2>

//             <div className="cart-items">
//                 {cart.cartItem.map(item => (
//                     <div key={item.cartItemId}>
//                         {item.product.productName} × {item.quantity} — ₪{item.product.productPrice}
//                     </div>
//                 ))}
//                 <p><strong>סה"כ לתשלום: ₪{cart.totalPrice}</strong></p>
//             </div>

//             <h3>📦 פרטי משלוח</h3>
//             <div className="shipping-form">
//                 <input name="address" placeholder="כתובת" value={shippingInfo.address} onChange={handleChange} />
//                 <input name="city" placeholder="עיר" value={shippingInfo.city} onChange={handleChange} />
//                 <input name="zip" placeholder="מיקוד" value={shippingInfo.zip} onChange={handleChange} />
//                 <input name="country" placeholder="מדינה" value={shippingInfo.country} onChange={handleChange} />
//             </div>

//             <button onClick={handleConfirm}>✔️ אשר והמשך לתשלום</button>
//         </div>
//     );
// };

// export default OrderSummary;
