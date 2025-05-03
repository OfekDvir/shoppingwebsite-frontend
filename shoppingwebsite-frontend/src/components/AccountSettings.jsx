import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { updateUser } from '../api/serverApi';

const AccountSettings = () => {
    const { currentUser, login } = useAuth();

    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState(currentUser.password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUser(currentUser.userId, {
                ...currentUser,
                firstName,
                lastName,
                email,
                password,
            });
            alert('הפרטים עודכנו בהצלחה!');
            login(updatedUser); // עדכון ה־context
        } catch (err) {
            console.error('שגיאה בעדכון', err);
            alert('הייתה שגיאה בעדכון');
        }
    };

    return (
        <div className="account-settings-container">
            <h2 className="account-settings-title">עריכת פרטי חשבון</h2>
            <form className="account-settings-form" onSubmit={handleSubmit}>
                <input
                    className="account-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="שם פרטי"
                />
                <input
                    className="account-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="שם משפחה"
                />
                <input
                    className="account-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="אימייל"
                />
                <input
                    className="account-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="סיסמה"
                />
                <button type="submit" className="save-button">שמור שינויים</button>
            </form>
        </div>

    );
};

export default AccountSettings;
