import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // אתה כבר משתמש בזה כמו שצריך
import { checkout } from '../api/serverApi';
const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, updateCart, currentUser } = useAuth(); // ⬅️ עכשיו זה בתוך הקומפוננטה — תקין
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        creditCard: ""

    });
    useEffect(() => {
        if (currentUser) {
            const { firstName, lastName, address } = currentUser;
            setFormData((prev) => ({
                ...prev,
                fullName: `${firstName} ${lastName}`,
                address: address?.address || '',
                city: address?.city || '',
                zip: address?.zipcode || '',
                country: address?.country || ''
                // שים לב: אנחנו לא נוגעים ב-creditCard כדי לא למחוק מה שהמשתמש כבר הקליד
            }));
        }
    }, [currentUser]);

    // useEffect(() => {
    //     if (currentUser) {
    //         const { firstName, lastName, address } = currentUser;
    //         setFormData({
    //             fullName: `${firstName} ${lastName}`,
    //             address: address?.address || '',
    //             city: address?.city || '',
    //             zip: address?.zipcode || '',
    //             country: address?.country || '',
    //             creditCard: address?.creditCard || ''
    //         });
    //     }
    // }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                userId: currentUser.userId,
                shippingInfo: {
                    address: formData.address,
                    city: formData.city,
                    zip: formData.zip,
                    country: formData.country
                }
            };

            console.log('🚀 Sending payload:', payload);
            const order = await checkout(payload);
            localStorage.setItem("cartId", order.cart.cartId);
            alert('✔️ ההזמנה הושלמה!');
            navigate('/orders');
        } catch (err) {
            console.error('❌ שגיאה:', err);
            alert('אירעה שגיאה. נסה שוב.');
        }
    };

    return (
        <div className="checkout-container">
            <h2>💳 עמוד תשלום</h2>
            <form className="checkout-form" onSubmit={handleSubmit}>
                <label>
                    שם מלא:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        readOnly
                    />
                </label>

                <label>
                    כתובת:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    עיר:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    מיקוד:
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    מדינה:
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    מספר כרטיס אשראי:
                    <input
                        type="text"
                        name="creditCard"
                        value={formData.creditCard}
                        onChange={handleChange}
                        required
                        maxLength={19}
                        pattern="\d{13,19}"
                        placeholder="למשל: 1234 5678 9012 3456"
                    />
                </label>

                <button type="submit">סיום הזמנה</button>
            </form>
        </div>
    );
};
export default CheckoutPage;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CheckoutPage = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         fullName: '',
//         address: '',
//         creditCard: '',
//     });

//     const handleChange = (e) => {
//         const { name, value, maxLength } = e.target;
//         setFormData({ ...formData, [name]: value.slice(0, maxLength) });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         alert('התשלום בוצע בהצלחה!');
//         navigate('/'); // מעבר לאתר הבית
//     };

//     return (
//         <div className="checkout-container">
//             <h2>💳 עמוד תשלום</h2>
//             <p>תודה שבחרת לקנות אצלנו!</p>

//             <form className="checkout-form" onSubmit={handleSubmit}>
//                 <label>
//                     שם מלא:
//                     <input
//                         type="text"
//                         name="fullName"
//                         placeholder="הכנס שם מלא"
//                         value={formData.fullName}
//                         maxLength={30}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>

//                 <label>
//                     כתובת משלוח:
//                     <input
//                         type="text"
//                         name="address"
//                         placeholder="הכנס כתובת"
//                         value={formData.address}
//                         maxLength={50}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>

//                 <label>
//                     מספר כרטיס אשראי:
//                     <input
//                         type="text"
//                         name="creditCard"
//                         placeholder="XXXX-XXXX-XXXX-XXXX"
//                         value={formData.creditCard}
//                         maxLength={19}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>

//                 <button type="submit">ביצוע תשלום</button>
//             </form>
//         </div>
//     );
// };

// export default CheckoutPage;