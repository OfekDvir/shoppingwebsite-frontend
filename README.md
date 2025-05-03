
---

```markdown
# 🛍️ Shopping Website - Frontend

This is the frontend part of a full-stack e-commerce application.  
It provides a user-friendly interface for browsing products, managing the cart, placing orders, and admin product management.

## ✨ Features

- 🔎 Search for products by name
- 📂 Filter by category
- 🛒 Add/remove items to the cart
- ❤️ Add/remove items from favorites
- 📦 View and track orders
- 👤 Admin panel to add products

## 🧠 Project Logic

- Users must be logged in to access their cart or add favorites.
- Cart and favorites are dynamically loaded based on the logged-in user.
- Orders with TEMP status can be edited; DOONE orders are read-only.
- Responsive design and dynamic rendering using React hooks and context.

## 🧰 Technology Stack

- **React 18**
- **React Router DOM**
- **Axios**
- **CSS3**
- **Context API (AuthContext)**

## 🛠️ Run Locally

```bash
git clone https://github.com/OfekDvir/shoppingwebsite-frontend.git
cd shoppingwebsite-frontend
npm install
npm start
