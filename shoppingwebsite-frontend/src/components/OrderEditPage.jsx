import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderEditPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/orders/${id}`)
            .then(res => res.json())
            .then(data => setOrder(data))
            .catch(err => console.error("\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05d8\u05e2\u05d9\u05e0\u05ea \u05d4\u05d4\u05d6\u05de\u05e0\u05d4", err));
    }, [id]);

    const handleRemoveItem = (cartItemId) => {
        const updatedItems = order.orderItems.filter(item => item.cartItemId !== cartItemId);
        const updatedTotal = updatedItems.reduce(
            (sum, item) => sum + item.product.productPrice * item.quantity,
            0
        );
        setOrder({ ...order, orderItems: updatedItems, totalPrice: updatedTotal });
    };

    const handleQuantityChange = (cartItemId, delta) => {
        const updatedItems = order.orderItems.map(item => {
            if (item.cartItemId === cartItemId) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        const updatedTotal = updatedItems.reduce(
            (sum, item) => sum + item.product.productPrice * item.quantity,
            0
        );
        setOrder({ ...order, orderItems: updatedItems, totalPrice: updatedTotal });
    };

    const handleSave = async () => {
        const updatedOrder = {
            ...order,
            totalPrice: order.orderItems.reduce(
                (sum, item) => sum + item.product.productPrice * item.quantity,
                0
            )
        };

        try {
            const response = await fetch(`/api/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedOrder)
            });

            if (response.ok) {
                alert("\u05d4\u05d6\u05de\u05e0\u05d4 \u05e2\u05d5\u05d3\u05db\u05e0\u05d4 \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4!");
                navigate("/orderlist");
            } else {
                alert("\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e2\u05d3\u05db\u05d5\u05df \u05d4\u05d6\u05de\u05e0\u05d4");
            }
        } catch (err) {
            console.error("\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e2\u05d3\u05db\u05d5\u05df \u05d4\u05d6\u05de\u05e0\u05d4", err);
        }
    };

    if (!order) return <p className="loading">\u05d8\u05d5\u05e2\u05df \u05d4\u05d6\u05de\u05e0\u05d4...</p>;

    return (
        <div className="order-view-container">
            <h2 className="order-title">📝 עריכת הזמנה #{order.id}</h2>
            <ul className="item-list">
                {order.orderItems.map(item => (
                    <li key={item.cartItemId} className="item">
                        <span className="item-name">{item.product.productName}</span>
                        <span className="item-qty">× {item.quantity}</span>
                        <span className="item-price">₪{item.product.productPrice}</span>
                        <button onClick={() => handleQuantityChange(item.cartItemId, +1)}>➕</button>
                        <button onClick={() => handleQuantityChange(item.cartItemId, -1)}>➖</button>
                        <button onClick={() => handleRemoveItem(item.cartItemId)}>🗑️ הסר</button>
                    </li>
                ))}
            </ul>

            <p className="total"><strong>סה"כ לתשלום: ₪{order.totalPrice}</strong></p>
            <button onClick={handleSave}>💾 שמור שינויים</button>
        </div>
    );
};

export default OrderEditPage;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const OrderEditPage = () => {
//     const { id } = useParams();
//     const [order, setOrder] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch(`/api/orders/${id}`)
//             .then(res => res.json())
//             .then(data => setOrder(data))
//             .catch(err => console.error("\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05d8\u05e2\u05d9\u05e0\u05ea \u05d4\u05d4\u05d6\u05de\u05e0\u05d4", err));
//     }, [id]);

//     const handleRemoveItem = (cartItemId) => {
//         const updatedItems = order.orderItems.filter(item => item.cartItemId !== cartItemId);
//         const updatedTotal = updatedItems.reduce(
//             (sum, item) => sum + item.product.productPrice * item.quantity,
//             0
//         );
//         setOrder({ ...order, orderItems: updatedItems, totalPrice: updatedTotal });
//     };

//     const handleQuantityChange = (cartItemId, delta) => {
//         const updatedItems = order.orderItems.map(item => {
//             if (item.cartItemId === cartItemId) {
//                 const newQuantity = Math.max(1, item.quantity + delta);
//                 return { ...item, quantity: newQuantity };
//             }
//             return item;
//         });
//         const updatedTotal = updatedItems.reduce(
//             (sum, item) => sum + item.product.productPrice * item.quantity,
//             0
//         );
//         setOrder({ ...order, orderItems: updatedItems, totalPrice: updatedTotal });
//     };

//     const handleSave = async () => {
//         const updatedOrder = {
//             ...order,
//             totalPrice: order.orderItems.reduce(
//                 (sum, item) => sum + item.product.productPrice * item.quantity,
//                 0
//             )
//         };

//         try {
//             const response = await fetch(`/api/orders/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedOrder)
//             });

//             if (response.ok) {
//                 alert("\u05d4\u05d6\u05de\u05e0\u05d4 \u05e2\u05d5\u05d3\u05db\u05e0\u05d4 \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4!");
//                 navigate("/orderlist");
//             } else {
//                 alert("\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e2\u05d3\u05db\u05d5\u05df \u05d4\u05d6\u05de\u05e0\u05d4");
//             }
//         } catch (err) {
//             console.error("\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e2\u05d3\u05db\u05d5\u05df \u05d4\u05d6\u05de\u05e0\u05d4", err);
//         }
//     };

//     if (!order) return <p>\u05d8\u05d5\u05e2\u05df \u05d4\u05d6\u05de\u05e0\u05d4...</p>;

//     return (
//         <div>
//             <h2>\ud83d\udcdd \u05e2\u05e8\u05d9\u05db\u05ea \u05d4\u05d6\u05de\u05e0\u05d4 #{order.id}</h2>
//             <ul>
//                 {order.orderItems.map(item => (
//                     <li key={item.cartItemId}>
//                         {item.product.productName} × {item.quantity} ₪{item.product.productPrice}
//                         <button onClick={() => handleQuantityChange(item.cartItemId, +1)}>➕</button>
//                         <button onClick={() => handleQuantityChange(item.cartItemId, -1)}>➖</button>
//                         <button onClick={() => handleRemoveItem(item.cartItemId)}>🗑️ הסר</button>
//                     </li>
//                 ))}
//             </ul>

//             <p><strong>סה\"כ לתשלום: ₪{order.totalPrice}</strong></p>
//             <button onClick={handleSave}>💾 שמור שינויים</button>
//         </div>
//     );
// };

// export default OrderEditPage;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const OrderEditPage = () => {
//     const { id } = useParams();
//     const [order, setOrder] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch(`/api/orders/${id}`)
//             .then(res => res.json())
//             .then(data => setOrder(data))
//             .catch(err => console.error("שגיאה בטעינת ההזמנה", err));
//     }, [id]);

//     const handleRemoveItem = (cartItemId) => {
//         const updatedItems = order.orderItems.filter(item => item.cartItemId !== cartItemId);
//         setOrder({ ...order, orderItems: updatedItems });
//     };

//     const handleSave = async () => {
//         const total = order.orderItems.reduce(
//             (sum, item) => sum + item.product.productPrice * item.quantity,
//             0
//         );

//         const updatedOrder = {
//             ...order,
//             totalPrice: total
//         };

//         try {
//             const response = await fetch(`/api/orders/${id}`, {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedOrder)
//             });

//             if (response.ok) {
//                 alert("הזמנה עודכנה בהצלחה!");
//                 navigate("/orders");
//             }
//         } catch (err) {
//             console.error("שגיאה בעדכון הזמנה", err);
//         }
//     };


//     if (!order) return <p>טוען הזמנה...</p>;

//     return (
//         <div>
//             <h2>📝 עריכת הזמנה #{order.id}</h2>
//             <ul>
//                 {order.orderItems.map(item => (
//                     <li key={item.cartItemId}>
//                         {item.product.productName} × {item.quantity}
//                         <button onClick={() => handleRemoveItem(item.cartItemId)}>הסר</button>
//                     </li>
//                 ))}
//             </ul>

//             <p><strong>סה"כ: ₪{order.totalPrice}</strong></p>
//             <button onClick={handleSave}>💾 שמור שינויים</button>
//         </div>
//     );
// };

// export default OrderEditPage;
