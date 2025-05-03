import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartById } from '../api/serverApi'; // לוודא שהנתיב נכון!

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [cart, setCart] = useState(null); // cart גלובלי

    // טען משתמש מה-localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setCurrentUser(parsedUser);
        }
    }, []);

    // ברגע שיש currentUser נטען את העגלה מהשרת
    useEffect(() => {

        updateCart();

    }, [currentUser]);

    const updateCart = async (id) => {
        try {
            if (id) {
                localStorage.setItem("cartId", id);
            }
            const res = await getCartById(localStorage.getItem("cartId"));
            setCart(res);
        } catch (err) {
            console.error("שגיאה בעדכון עגלה:", err);
        }
    };

    const login = (userData) => {
        console.log("🔐 Logged in user:", userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("cartId", userData.orders.find(order => order.status === "PENDING").cart.cartId);
        setCurrentUser(userData);
    };

    const logout = () => {
        setCurrentUser(null);
        setCart(null); // ניקוי העגלה
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userId");
        localStorage.removeItem("cartId");
    };

    return (
        <AuthContext.Provider value={{ currentUser, cart, login, logout, updateCart }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);

//     // טוען את המשתמש מה-localStorage אם קיים
//     useEffect(() => {
//         const storedUser = localStorage.getItem("currentUser");
//         if (storedUser) {
//             setCurrentUser(JSON.parse(storedUser));
//         }
//     }, []);

//     const login = (userData) => {
//         console.log("🔐 Logged in user:", userData);
//         setCurrentUser(userData);
//         localStorage.setItem("currentUser", JSON.stringify(userData));
//         localStorage.setItem("userId", userData.userId); // אפשרי רק אם אתה צריך את זה בנפרד
//     };

//     const logout = () => {
//         setCurrentUser(null);
//         localStorage.removeItem("currentUser");
//         localStorage.removeItem("userId");
//     };

//     return (
//         <AuthContext.Provider value={{ currentUser, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
