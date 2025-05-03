import React, { useEffect, useState } from "react";
import { getAllProduct } from "../api/serverApi";
import { useAuth } from "./AuthContext";
import { useLocation, Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";

const ProductList = () => {
    const { currentUser } = useAuth();
    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categoryOpen, setCategoryOpen] = useState(false);
    const location = useLocation();
    const [productList, setProductList] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState(new Set());

    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("search")?.toLowerCase() || "";

    const fetchProducts = async () => {
        try {
            const res = await getAllProduct();
            if (Array.isArray(res)) {
                setProductList(res);
            } else {
                setProductList([]);
            }
        } catch (error) {
            console.error("שגיאה בטעינת מוצרים:", error);
            setProductList([]);
        }
    };

    const loadFavorites = async () => {
        if (!currentUser?.userId) return;
        try {
            const res = await fetch(`/api/favorites/${currentUser.userId}`);
            if (res.ok) {
                const data = await res.json();
                const ids = new Set(data.products?.map(p => p.productId));
                setFavoriteIds(ids);
            }
        } catch (err) {
            console.error("שגיאה בטעינת מועדפים", err);
        }
    };

    useEffect(() => {
        fetchProducts();
        loadFavorites();
    }, [currentUser]);

    const categories = ['all', ...new Set(productList.map(p => p.category))];

    const filteredProducts = productList.filter((product) =>
        product.productName?.toLowerCase().includes(searchInput.toLowerCase()) &&
        (selectedCategory === 'all' || product.category === selectedCategory)
    );

    return (
        <div>
            <div className="product-list-header">
                <h2 className="product-list-title">רשימת מוצרים</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="🔍 חפש מוצר..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
            </div>
            {currentUser?.role === "ADMIN" && (
                <button onClick={() => window.location.href = '/add-product'}>
                    ➕ הוסף מוצר חדש
                </button>
            )}
            <div className="category-filter">
                <button onClick={() => setCategoryOpen(!categoryOpen)} className="toggle-button">
                    {categoryOpen ? "סגור קטגוריות ✖️" : "סינון לפי קטגוריה ⬇️"}
                </button>
                {categoryOpen && (
                    <ul>
                        {categories.map((cat) => (
                            <li
                                key={cat}
                                className={selectedCategory === cat ? 'selected' : ''}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {filteredProducts.length === 0 ? (
                <p>לא נמצאו מוצרים תואמים</p>
            ) : (
                <div className="product-list">
                    {filteredProducts.map((product) => (
                        <div className="product-card" key={product.productId}>
                            <div className="product-image-section">
                                <Link to={`/products/${product.productId}`} className="product-image-link">
                                    {product.productImage && (
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            onError={(e) => (e.target.style.display = 'none')}
                                        />
                                    )}
                                </Link>
                            </div>
                            <h3>{product.productName}</h3>
                            <p className="price-text">₪ {product.productPrice}</p>

                            {product.unitStock === 0 ? (
                                <p className="out-of-stock">❌ אזל מהמלאי</p>
                            ) : product.unitStock < 5 ? (
                                <p className="low-stock">⚠️ נותרו רק {product.unitStock} במלאי!</p>
                            ) : (
                                <p className="in-stock">✅ זמין במלאי</p>
                            )}

                            <div className="action-buttons">
                                <Link to={`/products/${product.productId}`}>
                                    <button className="details-button">לפרטי מוצר</button>
                                </Link>
                                <div className="cart-button-wrapper">
                                    <AddToCartButton productId={product.productId} />
                                </div>
                            </div>

                            {currentUser && (
                                <div className="favorite-button-wrapper">
                                    <FavoriteButton
                                        productId={product.productId}
                                        isFavorite={favoriteIds.has(product.productId)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;