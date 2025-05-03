import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getOrdersByUserId } from "../api/serverApi"; // ודא שזה קיים
import { Link } from "react-router-dom";

const UserOrders = () => {
    const { currentUser } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!currentUser?.userId) return;

            try {
                const res = await getOrdersByUserId(currentUser.userId);
                setOrders(res);
            } catch (err) {
                console.error("שגיאה בקבלת ההזמנות:", err);
            }
        };

        fetchOrders();
    }, [currentUser]);

    return (
        <div>
            <h2>📦 ההזמנות שלי</h2>
            {orders.length === 0 ? (
                <p>לא נמצאו הזמנות.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            <Link to={`/orders/${order.id}`}>
                                הזמנה #{order.id} - סטטוס: {order.status} - {new Date(order.orderDate).toLocaleDateString()}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserOrders;
