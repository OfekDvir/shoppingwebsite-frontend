import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
