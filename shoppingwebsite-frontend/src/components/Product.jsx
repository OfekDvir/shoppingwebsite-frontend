import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api/serverApi";
import { useAuth } from "../components/AuthContext";
import AddToCartButton from "./AddToCartButton";
import "../App.css";

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id);
                setProduct(response);
            } catch (error) {
                console.error("שגיאה בקבלת מוצר:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>טוען מוצר...</p>;

    return (
        <div className="product-page">
            <div className="product-image-section">
                {product.productImage ? (
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        onError={(e) => (e.target.style.display = "none")}
                    />
                ) : (
                    <div className="no-image">אין תמונה</div>
                )}
            </div>


            <div className="product-details">
                <h2>{product.productName}</h2>
                <p className="description">📝 תיאור: {product.description}</p>
                <p className="price">💰 מחיר: {product.productPrice} ₪</p>

                {product.unitStock < 5 && (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>
                        נותרו רק {product.unitStock} במלאי! מהרו להזמין 🛍️
                    </p>
                )}

                <p>זמינות במלאי: {product.unitStock} יחידות</p>

                {currentUser && (
                    product.unitStock > 0 ? (
                        <AddToCartButton productId={product.productId} fetchCart={null} />
                    ) : (
                        <p style={{ color: "gray", fontWeight: "bold", marginTop: "10px" }}>
                            ❌ המוצר אזל מהמלאי ולא ניתן להזמין כרגע
                        </p>
                    )
                )}
            </div>
        </div>
    );
};

export default Product;
