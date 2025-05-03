import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderViewPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetch(`/api/orders/${id}`)
            .then(res => res.json())
            .then(data => setOrder(data))
            .catch(err => console.error("שגיאה בטעינת פרטי ההזמנה", err));
    }, [id]);

    if (!order) return <p className="loading">טוען...</p>;

    return (
        <div className="order-view-container">
            <h2 className="order-title">🔍 פרטי הזמנה סגורה #{order.id}</h2>
            <p><strong>📅 תאריך הזמנה:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>📌 סטטוס:</strong> {order.status}</p>

            <h3 className="section-title">📦 פריטים בהזמנה:</h3>
            <ul className="item-list">
                {order.cart?.cartItem?.length > 0 ? (
                    order.cart.cartItem.map(item => (
                        <li key={item.cartItemId} className="item">
                            <img
                                src={item.product.productImage}
                                alt={item.product.productName}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    marginLeft: '10px'
                                }}
                            />
                            <span className="item-name">{item.product.productName}</span>
                            <span className="item-qty">× {item.quantity}</span>
                            <span className="item-price">₪{item.product.productPrice}</span>
                        </li>
                    ))
                ) : (
                    <p>אין פרטים בהזמנה</p>
                )}
            </ul>
            {/* <ul className="item-list">
                {order.cart?.cartItem?.length > 0 ? (
                    order.cart.cartItem.map(item => (
                        <li key={item.cartItemId} className="item">
                            <span className="item-name">{item.product.productName}</span>
                            <span className="item-qty">× {item.quantity}</span>
                            <span className="item-price">₪{item.product.productPrice}</span>
                        </li>
                    ))
                ) : (
                    <p>אין פרטים בהזמנה</p>
                )}

            </ul> */}

            {/* <p className="total"><strong>💰 סה"כ לתשלום:</strong> ₪{order.cart.totalPrice.toFixed(2)}</p> */}
            <p className="total">
                <strong>💰 סה"כ לתשלום:</strong> ₪
                {order.totalPrice > 0
                    ? order.totalPrice.toFixed(2)
                    : order.cart?.cartItem?.reduce((sum, item) => sum + item.product.productPrice * item.quantity, 0).toFixed(2)}
            </p>

            <div className="address-section">
                <h4>🗺️ כתובת משלוח:</h4>
                <p>
                    {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country}, מיקוד: {order.shippingAddress?.zipcode}
                </p>
            </div>

            <div className="address-section">
                <h4>🧾 כתובת חיוב:</h4>
                <p>
                    {order.billingAddress?.address}, {order.billingAddress?.city}, {order.billingAddress?.country}, מיקוד: {order.billingAddress?.zipcode}
                </p>
            </div>
        </div>
    );
};

export default OrderViewPage;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const OrderViewPage = () => {
//     const { id } = useParams();
//     const [order, setOrder] = useState(null);

//     useEffect(() => {
//         fetch(`/api/orders/${id}`)
//             .then(res => res.json())
//             .then(data => setOrder(data))
//             .catch(err => console.error("שגיאה בטעינת פרטי ההזמנה", err));
//     }, [id]);

//     if (!order) return <p>טוען...</p>;

//     return (
//         <div>
//             <h2>🔍 פרטי הזמנה סגורה #{order.id}</h2>
//             <p>תאריך: {new Date(order.orderDate).toLocaleDateString()}</p>
//             <p>סטטוס: {order.status}</p>

//             <h3>📦 פריטים:</h3>
//             <ul>
//                 {order.orderItems.map(item => (
//                     <li key={item.cartItemId}>
//                         {item.product.productName} × {item.quantity} — ₪{item.product.productPrice}
//                     </li>
//                 ))}
//             </ul>

//             <p><strong>סה"כ לתשלום: ₪{order.totalPrice}</strong></p>

//             <h4>🗺️ כתובת משלוח:</h4>
//             <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>

//             <h4>🧾 כתובת חיוב:</h4>
//             <p>{order.billingAddress?.address}, {order.billingAddress?.city}</p>
//         </div>
//     );
// };

// export default OrderViewPage;