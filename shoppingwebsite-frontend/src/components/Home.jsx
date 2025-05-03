import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url("/background.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <div className="welcome-box">
                <h1 className="home-title">
                    Welcome to the best shopping site in the country{' '}
                    <img src="https://flagcdn.com/w40/il.png" alt="Israel Flag" className="flag-icon" />
                </h1>
                <p className="home-subtitle">
                    Start shopping now or explore our latest products!
                </p>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="🔍 Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
        </div>
    );
}

export default Home;



// function Home() {
//     const { currentUser, logout } = useAuth();

//     return (
//         <div>
//             <div className="menu">
//                 <div>
//                     <h3 style={{ margin: 0 }}>Welcome to the best shopping site in the country.</h3>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                     {currentUser && currentUser.role === 'ADMIN' && (
//                         <button className="admin-button" onClick={() => window.location.href = '/admin'}>
//                             Go to Admin Panel
//                         </button>
//                     )}
//                     {currentUser ? (
//                         <>
//                             שלום {currentUser.firstName}
//                             <button onClick={logout}>Logout</button>
//                         </>
//                     ) : (
//                         <Link to="/login">Login</Link>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Home;
