import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;

    useEffect(() => {
        const fetchOrders = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`/api/orders/user/${userId}`);
                    setOrders(response.data);
                } catch (err) {
                    alert("שגיאה בטעינת ההזמנות");
                    console.error("שגיאה בטעינת ההזמנות", err);
                }
            }
        };

        fetchOrders();
    }, [userId]);

    const goToOrder = (order) => {
        if (order.status === "TEMP") {
            navigate(`/orders/edit/${order.id}`);
        } else {
            navigate(`/orders/view/${order.id}`);
        }
    };
    const sortedOrders = [...orders].sort((a, b) => {
        if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
        if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
        return new Date(b.orderDate) - new Date(a.orderDate);
    });

    return (
        <div className="order-list-container">
            <h2 className="order-title">📋 ההזמנות שלי</h2>

            {sortedOrders.map((order, index) => (
                <div key={order.id} className="order-card" onClick={() => goToOrder(order)}>
                    <div className="order-row"><span>🆔</span> מספר הזמנה: {index + 1}</div>
                    <div className="order-row"><span>📅</span> תאריך: {new Date(order.orderDate).toLocaleString()}</div>
                    <div className="order-row status-row">
                        {order.status === "PENDING" ? (
                            <span className="status pending">🕓 סטטוס: {order.status}</span>
                        ) : order.status === "DOONE" ? (
                            <span className="status done">✅ סטטוס: {order.status}</span>
                        ) : (
                            <span className="status other">📌 סטטוס: {order.status}</span>
                        )}
                    </div>
                    <div className="order-row">
                        <span>💰</span> סה"כ לתשלום: ₪
                        {order.totalPrice && typeof order.totalPrice === 'number'
                            ? order.totalPrice.toFixed(2)
                            : order.user?.cart?.totalPrice?.toFixed(2) || "0.00"}


                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderListPage;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const OrderListPage = () => {
//     const [orders, setOrders] = useState([]);
//     const navigate = useNavigate();
//     const userId = JSON.parse(localStorage.getItem("currentUser"))?.userId;

//     useEffect(() => {
//         if (userId) {
//             fetch(`/api/orders/user/${userId}`)
//                 .then(res => res.json())
//                 .then(data => setOrders(data))
//                 .catch(err => console.error("שגיאה בטעינת ההזמנות", err));
//         }
//     }, [userId]);

//     const goToOrder = (order) => {
//         if (order.status === "TEMP") {
//             navigate(`/orders/edit/${order.id}`);
//         } else {
//             navigate(`/orders/view/${order.id}`);
//         }
//     };

//     return (
//         <div className="order-list-container">
//             <h2 className="order-title">📋 ההזמנות שלי</h2>
//             {orders.map((order, index) => (
//                 <div key={order.id} className="order-card" onClick={() => goToOrder(order)}>
//                     <div className="order-row"><span>🆔</span> מספר הזמנה: {index + 1}</div>
//                     <div className="order-row"><span>📅</span> תאריך: {new Date(order.orderDate).toLocaleString()}</div>
//                     <div className="order-row"><span>📌</span> סטטוס: {order.status}</div>
//                     <div className="order-row"><span>💰</span> סה"כ לתשלום: ₪{order.totalPrice}</div>
//                     {/* <span>💰</span> סה"כ לתשלום: ₪{order.totalPrice || order.user?.cart?.totalPrice || 0} */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default OrderListPage;


