import './App.css';
import { Routes, Route } from 'react-router-dom';
import Product from './components/Product';
import Users from './components/Users';
import Home from './components/Home';
import UsersList from './components/UsersList';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import AccountSettings from './components/AccountSettings';
import Navbar from './components/Navbar'; // ✅ חדש
import FavoritesPage from "./components/FavoritesPage";
import OrderSummary from './components/OrderSummary';
import OrderListPage from "./components/OrderListPage";
import OrderEditPage from "./components/OrderEditPage";
import OrderViewPage from "./components/OrderViewPage";
import UserOrders from "./components/UserOrders";
import AdminRoute from './components/AdminRoute';
import AddProduct from './components/AddProduct';
function App() {
  return (
    <div>
      <Navbar /> {/* ✅ הניווט החדש */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/users/:id" element={<Users />} />
        <Route path="/users" element={<UsersList />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/accountSettings" element={<AccountSettings />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/orders" element={<OrderListPage />} />
        <Route path="/orders/edit/:id" element={<OrderEditPage />} />
        <Route path="/orders/view/:id" element={<OrderViewPage />} />
        <Route path="/orders" element={<UserOrders />} />
        <Route path='/add-product' element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        } />

      </Routes>
    </div>
  );
}

export default App;

// import './App.css';
// import { Routes, Route, Link } from 'react-router-dom';
// import Product from './components/Product';
// import Users from './components/Users';
// import Home from './components/Home';
// import UsersList from './components/UsersList';
// import ProductList from './components/ProductList';
// import Login from './components/Login';
// import Register from './components/Register';
// import AddProduct from './components/AddProduct';
// import CartView from './components/CartView';
// import CartIconWithCount from './components/CartIconWithCount';
// import { useAuth } from './components/AuthContext';
// import CartPage from './components/CartPage';
// import CheckoutPage from './components/CheckoutPage';
// import AccountSettings from './components/AccountSettings';

// function App() {
//   const { currentUser, logout } = useAuth();

//   return (
//     <div>
//       <div className='menu'>
//         <Link to="/">Home</Link>
//         <Link to="/users">Users</Link>
//         <Link to="/products">Products</Link>


//         {!currentUser && <Link to="/login">Login</Link>}
//         {!currentUser && <Link to="/register">Register</Link>}

//         {currentUser && <Link to="/add-product">Add Product</Link>}
//         {currentUser && <Link to="/cart">Shopping Cart 🛒</Link>}

//         <CartIconWithCount />

//         {currentUser && (
//           <>
//             <Link to="/accountSettings">Account Settings</Link>
//             <span style={{ marginLeft: '10px' }}>שלום, {currentUser.firstName}</span>
//             <button onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
//           </>
//         )}
//       </div>

//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path="/products/:id" element={<Product />} />
//         <Route path="/users/:id" element={<Users />} />
//         <Route path="/users" element={<UsersList />} />
//         <Route path='/products' element={<ProductList />} />
//         <Route path='/login' element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/add-product" element={<AddProduct />} />
//         {/* <Route path="/cart" element={<CartView />} /> */}
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/checkout" element={<CheckoutPage />} />
//         <Route path="/accountSettings" element={<AccountSettings />} />


//       </Routes>
//     </div>
//   );
// }

// export default App;