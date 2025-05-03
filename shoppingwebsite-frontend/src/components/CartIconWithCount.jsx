// CartView.jsx
import { useEffect, useState } from "react"

const CartView = () => {
    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)

    const fetchCart = async () => {
        const cartId = localStorage.getItem("cartId")
        if (!cartId) {
            alert("לא נמצא עגלת קניות. התחבר כדי לצפות בעגלה.")
            return
        }

        try {
            const response = await fetch(`/api/cart/${cartId}`)
            if (!response.ok) throw new Error("בעיה בקבלת העגלה")
            const cart = await response.json()
            setCartItems(cart.cartItem)
            setTotal(cart.totalPrice)
        } catch (error) {
            console.error("שגיאה בקבלת עגלה:", error)
        }
    }

    const updateQuantity = async (cartItemId, quantity) => {
        const cartId = localStorage.getItem("cartId")
        const item = cartItems.find(i => i.cartItemId === cartItemId)
        if (!item) return

        const updatedItem = { ...item, quantity }

        try {
            const response = await fetch(`/api/cart/${cartId}/cartItem`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedItem)
            })
            if (response.ok) {
                fetchCart()
            }
        } catch (err) {
            console.error("Failed to update quantity", err)
        }
    }

    const removeItem = async (cartItemId) => {
        const cartId = localStorage.getItem("cartId")
        try {
            const response = await fetch(`/api/cart/${cartId}/cartItem/${cartItemId}`, {
                method: "DELETE"
            })
            if (response.ok) {
                fetchCart()
            }
        } catch (err) {
            console.error("Failed to delete item", err)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    // return (
    //     <div className="cart-view">
    //         <h2>🛒 העגלה שלך</h2>
    //         {cartItems.length === 0 ? (
    //             <p>אין מוצרים בעגלה.</p>
    //         ) : (
    //             <ul>
    //                 {cartItems.map((item) => (
    //                     <li key={item.cartItemId}>
    //                         {item.product?.productName} -
    //                         מחיר: ${item.product?.productPrice} ×
    //                         <input
    //                             type="number"
    //                             min="1"
    //                             value={item.quantity}
    //                             onChange={(e) => updateQuantity(item.cartItemId, parseInt(e.target.value))}
    //                             style={{ width: "50px" }}
    //                         />
    //                         <button onClick={() => removeItem(item.cartItemId)}>הסר</button>
    //                     </li>
    //                 ))}
    //             </ul>
    //         )}
    //         <h3>סה"כ לתשלום: ${total.toFixed(2)}</h3>
    //     </div>
    // )
}

export default CartView
