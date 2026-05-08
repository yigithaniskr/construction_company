import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                Yükleniyor...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/yonetim-paneli/giris" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
