import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getAllProduct = async () => {
    const res = await axios.get(`${BASE_URL}/products`);
    return res.data;
};

export const getCartById = async (cartId) => {
    const res = await axios.get(`${BASE_URL}/carts/${cartId}`);
    return res.data;
};

export const getCartByUsersId = async (userId) => {
    const res = await axios.get(`${BASE_URL}/carts/user/${userId}`);
    return res.data;
};

export const addToCart = async (cartId, productId) => {
    return axios.post(`http://localhost:8080/api/carts/${cartId}/cartItem`, {
        product: { productId },
        quantity: 1,
    });
};

export const updateCartItemQuantity = async (cartId, updatedCartItem) => {
    return axios.put(`http://localhost:8080/api/carts/${cartId}/cartItem`, updatedCartItem);
};

export const deleteCartItem = async (cartId, cartItemId) => {
    return axios.delete(`http://localhost:8080/api/carts/${cartId}/cartItem/${cartItemId}`);
};

export const uploadProductImage = async (formData) => {
    const res = await axios.post(`${BASE_URL}/products/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};

export const addProduct = async (product) => {
    const res = await axios.post(`${BASE_URL}/products`, product);
    return res.data;
};

export const createUser = async (user) => {
    const res = await axios.post(`${BASE_URL}/users`, user);
    return res.data;
};

export const getUserById = async (userId) => {
    const res = await axios.get(`${BASE_URL}/users/${userId}`);
    return res.data;
};

export const getProductById = async (productId) => {
    const res = await axios.get(`${BASE_URL}/products/${productId}`);
    return res.data;
};
export const getOrdersByUserId = async (userId) => {
    const res = await fetch(`/api/orders/user/${userId}`);
    return await res.json();
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    const response = await axios.post(`${BASE_URL}`, userData);
    return response.data;
};
export const updateUser = async (userId, userData) => {
    const res = await axios.put(`${BASE_URL}/users/${userId}`, userData);
    return res.data;
};
export const addToFavorites = async (userId, productId) => {
    const response = await fetch(`/api/favorites/${userId}/add/${productId}`, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error("Failed to add product to favorites");
    }

    return response.json();
};
export const createOrder = async (orderData) => {
    const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    });
    return response.json();
};

export const checkout = async (checkoutData) => {
    const response = await axios.post(`${BASE_URL}/orders`, checkoutData);
    return response.data;
};


// // serverApi.js
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8080/api";

// // אין צורך ב-axios.create או baseURL מחדש

// export const getAllProduct = async () => {
//     const response = await axios.get("/products");
//     return response.data;
// };

// export const getProductById = (id) => {
//     return axios.get(`/products/${id}`);
// };

// export const addProduct = (product) => {
//     return axios.post("/products", product);
// };

// export const createUser = (user) => {
//     return axios.post("/users", user);
// };

// export const getUserById = (id) => {
//     return axios.get(`/users/${id}`);
// };

// export const addToCart = (cartId, productId) => {
//     return axios.post(`/carts/${cartId}/cartItem`, {
//         product: { productId },
//         quantity: 1
//     });
// };


// import axios from "axios"

// axios.defaults.baseURL = "http://localhost:8080/api"

// // --- Product
// export const getProductById = async (id) => {
//     const response = await axios.get("/products/" + id)
//     return response.data

// }
// export const getAllProduct = async () => {
//     const response = await axios.get("/products")
//     return response.data
// }
// export const addProduct = async (product) => {
//     const response = await axios.post("/products", product)
//     return response.data
// }

// // --- Customers
// export const getUserById = async (id) => {
//     const response = await axios.get("/users/" + id)
//     return response.data
// }
// export const getAllUsers = async () => {
//     const response = await axios.get("/users")
//     return response.data
// }
// export const createUser = async (customerData) => {
//     const response = await axios.post("/users", customerData)
//     return response.data
// }

// // --- Carts
// export const getCartById = async (id) => {
//     const response = await axios.get("/carts/" + id)
//     return response.data
// }

// export const getCartByUsersId = async (customerId) => {
//     const response = await axios.get(`/carts/users/${customerId}`)
//     return response.data
// }

// export const createCartForCustomer = async (customerId) => {
//     const response = await axios.post(`/carts/create/${customerId}`)
//     return response.data
// }

// export const clearCart = async (cartId) => {
//     const response = await axios.put(`/carts/${cartId}/clear`)
//     return response.data
// }

// export const deleteCart = async (cartId) => {
//     await axios.delete(`/carts/${cartId}`)
// }
