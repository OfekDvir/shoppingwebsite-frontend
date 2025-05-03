import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
    const { currentUser } = useAuth();
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = async () => {
        if (!currentUser?.userId) return;
        try {
            const response = await fetch(`/api/favorites/${currentUser.userId}`);
            if (response.ok) {
                const data = await response.json();
                setFavorites(data.products || []);
            }
        } catch (err) {
            console.error("שגיאה בקבלת המועדפים", err);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [currentUser]);

    const removeFromFavorites = async (productId) => {
        try {
            const response = await fetch("/api/favorites", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: currentUser.userId,
                    productId: productId
                })
            });

            if (response.ok) {
                setFavorites((prev) => prev.filter(p => p.productId !== productId));
            } else {
                alert("שגיאה בהסרה מהמועדפים");
            }
        } catch (err) {
            console.error("שגיאה בהסרה:", err);
        }
    };

    return (
        <div className="favorites-page">
            <h2>💖 המועדפים שלך</h2>
            {favorites.length === 0 ? (
                <p>אין מוצרים ברשימת המועדפים שלך.</p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map(product => (
                        <div key={product.productId} className="favorite-card">
                            <Link to={`/products/${product.productId}`} className="favorite-link">
                                <img
                                    src={product.productImage}
                                    alt={product.productName}
                                    className="favorite-img"
                                    onError={(e) => (e.target.style.display = "none")}
                                />
                                <h3>{product.productName}</h3>
                                <p>{product.productPrice} ₪</p>
                            </Link>
                            <button
                                onClick={() => removeFromFavorites(product.productId)}
                                className="remove-btn"
                            >
                                הסר ❌
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
