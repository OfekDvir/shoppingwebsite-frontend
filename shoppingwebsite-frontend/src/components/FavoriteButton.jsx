import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoriteButton = ({ productId, isFavorite = false, onToggle }) => {
    const { currentUser } = useAuth();
    const [isAdded, setIsAdded] = useState(isFavorite);

    useEffect(() => {
        setIsAdded(isFavorite);
    }, [isFavorite]);

    const toggleFavorite = async () => {
        if (!currentUser?.userId) {
            alert("עליך להתחבר כדי לנהל מועדפים");
            return;
        }

        try {
            const method = isAdded ? "DELETE" : "POST";
            const response = await fetch("/api/favorites", {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: currentUser.userId,
                    productId
                })
            });

            if (response.ok) {
                const updated = !isAdded;
                setIsAdded(updated);
                if (onToggle) {
                    onToggle(productId, updated);
                }
            } else {
                alert("שגיאה בעדכון מועדפים");
            }
        } catch (err) {
            console.error("שגיאה:", err);
        }
    };

    return (
        <button onClick={toggleFavorite} className="favorite-button">
            {isAdded ? "💖 במועדפים" : "🤍 הוסף למועדפים"}
        </button>
    );
};

export default FavoriteButton;

