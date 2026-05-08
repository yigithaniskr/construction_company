import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../firebase/auth';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/yonetim-paneli/giris', { replace: true });
    };

    return (
        <div className="admin-shell">
            <style>{`
                .admin-shell { min-height: 100vh; background: #f4f6fa; }
                .admin-header {
                    background: #0056b3;
                    color: #fff;
                    padding: 14px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }
                .admin-header .brand {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    color: #fff;
                    text-decoration: none;
                }
                .admin-header .brand img { height: 40px; }
                .admin-header .brand .title {
                    font-size: 17px;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                }
                .admin-header .brand .title small { display: block; font-weight: 400; font-size: 12px; opacity: 0.85; }
                .admin-header .actions { display: flex; align-items: center; gap: 14px; }
                .admin-header .view-site, .admin-header .logout-btn {
                    background: transparent;
                    color: #fff;
                    border: 1px solid rgba(255,255,255,0.4);
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background 0.2s ease, border-color 0.2s ease;
                }
                .admin-header .view-site:hover, .admin-header .logout-btn:hover {
                    background: rgba(255,255,255,0.15);
                    border-color: #fff;
                    color: #fff;
                }
                .admin-content { padding: 28px 20px 60px; max-width: 1240px; margin: 0 auto; }
                @media (max-width: 600px) {
                    .admin-header { padding: 12px 14px; }
                    .admin-header .brand .title { font-size: 14px; }
                    .admin-header .brand .title small { display: none; }
                    .admin-header .view-site { display: none; }
                }
            `}</style>
            <header className="admin-header">
                <Link to="/yonetim-paneli" className="brand">
                    <span className="title">
                        Yönetim Paneli
                        <small>İpekçi İnşaat</small>
                    </span>
                </Link>
                <div className="actions">
                    <Link to="/" className="view-site">Siteyi Görüntüle</Link>
                    <button className="logout-btn" onClick={handleLogout}>Çıkış Yap</button>
                </div>
            </header>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
